/* Gyro demo program for gyro with noise injection.
   Howard Samuels, 11/16/2004 
   
*/

 
int gyro_type = 300;        /* 150 for ADXRS150, 300 for ADXRS300 */
float lsb_ms_per_deg;       /* nominal scale factor depending on gyro type */
float scale_factor = 1.017; /* adjust this for your particular gyro! */
float theta;                /* current angle, units explained in update_angle() */
float offset;               /* gyro offset */
int gyro_port = 3;          /* gyro analog input port number */
int num_avgs = 800;         /* number of averages for calibration */
long time_ms;               /* system time the last gyro reading was taken */

int left = 3;               /* motor ports */
int right = 1;


void main(){

  if (gyro_type==300) 
    lsb_ms_per_deg = 256.0;
  else if (gyro_type==150) 
    lsb_ms_per_deg = 640.0;

  lsb_ms_per_deg *= scale_factor;

  calibrate_gyro();
  start_process(update_angle()); 
  /* Don't set theta, just read it! */
  start_process(display_angle());

  /* Make an Isoceles right triangle */
  go_straight(0.0,   80, 4000L);
  go_straight(135.0, 80, 5657L);   
  go_straight(270.0, 80, 4000L);
  go_to_angle(360.0); 

  /* Make another one, but obstruct the robot for the demo */
  start_press();
  msleep( 500L );
  go_straight(360.0, 80, 4000L);
  go_straight(495.0, 80, 5657L); 
  go_straight(630.0, 80, 4000L);
  go_to_angle(720.0); 

  /* Drive straight in current direction under gyro control... */
  start_press(); 
  msleep(500L);
  /* theta/lsb_ms_per_deg is the current angle in degrees */
  go_straight( theta/lsb_ms_per_deg, 80, 12000L );

  /* ... turn around ... */
  go_to_angle ( theta/lsb_ms_per_deg + 180.0 );

  /* ... and drive back open-loop (without gyro control). */
  go_open_loop( 80, 12000L ); 

} /* main() */


void calibrate_gyro(){
/*
   Averaging a number of readings only works when the gyro 
   noise is greater than the converter resolution.  Since 
   the xrs300 noise is far lower than the 20mV resolution 
   of the 8-bit converter, a noise source has been added 
   to the gyro board.  You should average for about 5 
   seconds to minimize the effects of the added noise.
*/

  int samples;
  float sum;
  long start_time_ms;
  long int_time_ms = 5000L;

  printf("Place robot,    press start.\n");
  start_press();
  printf("Stabilizing...\n");
  msleep(500L); /* Wait for robot to stabilize mechanically */
  printf("Calibrating     offset...\n");

  /* average some samples for offset */
  sum = 0.0;
  samples = 0;
  start_time_ms = mseconds();
  while( ( mseconds() - start_time_ms ) < int_time_ms ){
    sum += (float)analog(gyro_port);
    samples++;
  }
  offset = sum / (float)samples;

  theta = 0.0;

} /* calibrate_gyro() */


void update_angle(){
/* The units of theta are converter LSBs * ms
   1 deg/s = 5mV = 0.256 LSB for ADXRS300, 12.5mV = 0.64LSB for ADXRS150
   1 deg = 0.256LSB * 1000ms = 256 (stored in lsb_ms_per_deg)
   To convert theta to degrees, divide by lsb_ms_per_deg. */

  long delta_t_ms, new_time_ms;
  int i;

  time_ms = mseconds();

  for(;;){
    new_time_ms = mseconds();
    delta_t_ms = (new_time_ms - time_ms);

    /* This does the Riemann sum; CCW gyro output polarity is negative
       when the gyro is visible from the top of the robot. */
    theta -= ((float)analog(gyro_port) - offset) * (float)delta_t_ms; 

    time_ms = new_time_ms;
    defer();
  }
} /* update_angle() */


void display_angle(){
  for(;;){
    printf("%d degrees\n",(int)(theta / lsb_ms_per_deg)); 
    msleep(200L);
    defer();
  }
} /* display_angle() */


void go_to_angle(float angle) {
/* To convert degrees to units of theta, multiply by lsb_ms_per_deg.
   Demo robot turns at about 120 deg/s when speed = 100 */

  float angle_target;
  float error, tolerance;
  int speed;

  tolerance = 1.0 * lsb_ms_per_deg;
  angle_target = angle * lsb_ms_per_deg;
  error = theta - angle_target;

  if ( fabs(error) > tolerance ) {

    spin(100 * -sign(error));
    while(fabs(error) > (80.0 * lsb_ms_per_deg)){
      error = theta - angle_target;
    }

    spin(50 * -sign(error));
    while(fabs(error) > (60.0 * lsb_ms_per_deg)){
      error = theta - angle_target;
    }

    spin(30 * -sign(error));
    while(fabs(error) > (10.0 * lsb_ms_per_deg)){
      error = theta - angle_target;
    }

    /* Slam on the brakes */
    spin(100 * sign(error));
    msleep(10L);

    /* Fine adjust either direction as necessary */
    spin(5 * -sign(error));
    while(fabs(error) > tolerance){
      error = (theta - angle_target);
      spin(5 * -sign(error));
    }

    spin(0);  

  } /* if ( fabs(error)... */

} /* go_to_angle() */


void spin(int speed){
  motor(left, -speed);
  motor(right, speed);
} /* spin() */


void go_straight(float angle, int speed, long duration_ms){

/* The robot turns to the specified angle, then goes straight for 
   the specified duration. Note that speed must be greater than tweak, 
   and less than 100 - tweak. */

  long start_time;
  int tweak = 20;
  float angle_target;
  float tolerance;

  tolerance = lsb_ms_per_deg * 0.5; /* +/-0.5 degree accuracy */

  /* first turn the robot */
  go_to_angle(angle) ;

  /* then go forward under gyro control for the specified time */
  start_time = mseconds();
  angle_target = angle * lsb_ms_per_deg; 
  
  while ((mseconds() - start_time) < duration_ms){
    if (theta < (angle_target - tolerance)) {
      /* Turn CCW a little */
      motor(left, speed - tweak);
      motor(right, speed + tweak);
    } else if (theta > (angle_target + tolerance)){
      /* Turn CW a little */
      motor(left, speed + tweak);
      motor(right, speed - tweak);
    } else {
      motor(left, speed);
      motor(right, speed);
    }  
    /* You can check a sensor here and terminate the while loop */
  } /* while */
  
  /* Throw it in reverse briefly to stop quickly */
  motor(left, -100);
  motor(right, -100);
  msleep(20L);  
  motor(left, 0);
  motor(right, 0);
  
} /* void go_straight() */


void go_open_loop( int speed, long duration_ms ){

/* Drive both motors at a specified speed and duration. */

  long start_time;

  start_time = mseconds();
  
  while ((mseconds() - start_time) < duration_ms){
    motor(left, speed);
    motor(right, speed); 
    /* You can check a sensor here and terminate the while loop if necessary */
  } /* while */
  
  /* Throw it in reverse briefly to stop quickly */
  motor(left, -100);
  motor(right, -100);
  msleep(20L);  
  motor(left, 0);
  motor(right, 0);
  
} /* void go_open_loop() */


int sign(float a){
  if ( a > 0.0 ) return 1;
  else return -1;
} /* sign() */


float fabs(float a){
  if ( a > 0.0 ) return a;
  else return -a;
} /* fabs() */

