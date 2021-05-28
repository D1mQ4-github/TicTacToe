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
        ]; //Массив с победными комбинациями
    let currentPlayer = 0, //Очередь хода игрока
        endGame = false, //Индикатор конца игры
        playerX = [], //Список ходов игрока Х
        playerO = []; //Список ходов игрока О

    tiles.forEach((tile, key) => {
        tile.addEventListener('click', () => {
            //Остановить запись шагов если игра окончена
            if (!endGame) {
                //Запрет на перезапись плитки
                if (!tile.classList.contains('player_x') && !tile.classList.contains('player_o')) {
                    //Смена игроков
                    if (currentPlayer === 0) {
                        tile.classList.add('player_x');
                        //Добавить ход игрока
                        playerX.push(key);
                        //Сменить игрока
                        currentPlayer = 1;
                    } else {
                        tile.classList.add('player_o');
                        playerO.push(key);
                        currentPlayer = 0;
                    }
                }

                //Проверить ходы игроков по комбинациям
                winCombs.forEach(i => {
                    checkWinner(playerO, i, 'O');
                    checkWinner(playerX, i, 'X');
                });

                //Окончить игру если все клетки заполнены - Ничья
                if ((playerO.length + playerX.length) >= 9) {
                    endGame = true;
                    showModal('.game-modal', '.modal-close');
                }
            }
        });
    });

    //Проверка ходов игрока с комбинациями. Параметры(ходы игрока, одна комбинация, имя игрока)
    function checkWinner(playerMoves, i, playerName) {
        //Если попалось совпадение
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