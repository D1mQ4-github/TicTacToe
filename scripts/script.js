document.addEventListener('DOMContentLoaded', () => {
    const tiles = document.querySelectorAll('.game-tile'),
        winCombs = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
    let currentPlayer = 0,
        endGame = false,
        playerX = [],
        playerO = [];

    tiles.forEach((tile, key) => {
        tile.addEventListener('click', () => {
            if (!endGame) {
                if (!tile.classList.contains('player_x') && !tile.classList.contains('player_o')) {
                    if (currentPlayer === 0) {
                        tile.classList.add('player_x');
                        playerX.push(key);
                        currentPlayer = 1;
                    } else {
                        tile.classList.add('player_o');
                        playerO.push(key);
                        currentPlayer = 0;
                    }
                }

                winCombs.forEach(i => {
                    checkWinner(playerO, i, 'O');
                    checkWinner(playerX, i, 'X');
                });

                if ((playerO.length + playerX.length) >= 9) {
                    endGame = true;
                    showModal('.game-modal', '.modal-close');
                }
            }
        });
    });

    function checkWinner(playerMoves, i, playerName) {
        if (playerMoves.includes(i[0]) && playerMoves.includes(i[1]) && playerMoves.includes(i[2])) {
            showModal('.game-modal', '.modal-close', playerName);
            endGame = true;
        }
    }

    function showModal(modalSelector, modalCloseSelector, playerName = null) {
        const modal = document.querySelector(modalSelector),
            modalTitle = modal.querySelector('.modal-title');

        modal.style.display = 'flex';

        modalTitle.textContent = (playerName) ? `Поздравляем! Игрок ${playerName} победил.` : `Похоже ничья...`;

        modal.addEventListener('click', e => {
            if (e.target === modal || e.target.classList.contains(modalCloseSelector.slice(1))) {
                modal.style.display = 'none';
                gameReset();
            }
            if (e.target.classList.contains('btn-reset')) {
                modal.style.display = 'none';
                gameReset();
            }
        });
    }

    function gameReset() {
        tiles.forEach(tile => tile.classList.remove('player_x', 'player_o'));
        endGame = false;
        playerO = [];
        playerX = [];
        modal.style.display = 'none';
    }
});