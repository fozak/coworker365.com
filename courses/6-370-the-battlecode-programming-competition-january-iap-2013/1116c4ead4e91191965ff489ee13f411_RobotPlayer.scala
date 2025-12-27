package scalaplayer

import battlecode.common._

object RobotPlayer {

	def run(myRC : RobotController) {
		while(true) {
			try {
				while(myRC.isMovementActive()) {
					myRC.`yield`()
				}
				if (myRC.canMove(myRC.getDirection()))
					myRC.moveForward()
				else
					myRC.setDirection(myRC.getDirection().rotateRight())
			} catch {
				case e : Exception => {
					println("caught exception:")
					e.printStackTrace()
				}
			}
		}
	}

}
