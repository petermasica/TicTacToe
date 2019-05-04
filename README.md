# Tic Tac Toe game

The game has a simple UI with 2 game modes:
1) 'Human vs Computer' mode is checked by default. At this stage the board is not clickable. Click 'start new game' button to make the board clickable. Now, you can click any position in the board. Once a position is clicked, you are not allowed to click any other position until the computer selects one, too. The flow continues until the end of game. You can click 'start new game' button any time and it will start a new game with a clear state.

2) There is also a 'Computer Simulation' mode. When you select that and click 'start new game' the computer will essentially start playing all by itself.
Clicking 'start new game' button during the simulation would start a new simulation with a clear state.

## How to start the game
If you have Docker installed, run the `./start.sh` script in the root folder of the project. This should build & launch the docker container. Once the process is finished the app should be accessible at [http://localhost:8000/](http://localhost:8000).

In case you don't have Docker installed you can launch the app locally by running `yarn & yarn start`.

## How to launch tests
Navigate to the root folder of the project and install the dependencies by running `yarn` if you haven't done so, yet. Once that is done, run `yarn test` to run the tests.
