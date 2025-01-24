const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = {
    x: canvas.width / 2 - 30,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    color: 'blue',
    speed: 5
};

const enemies = [];
const enemySpeed = 5;
const enemySpawnRate = 5;
let frame = 0;

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawEnemies() {
    ctx.fillStyle = 'red';
    enemies.forEach(enemy => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

function updatePlayer() {
    if (keys.ArrowLeft && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x + player.width < canvas.width) {
        player.x += player.speed;
    }
    if (keys.ArrowUp && player.y + 0) {
        player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y + player.height < canvas.height) {
        player.y += player.speed;
    }
    if (keys.Space) { 
        changePlayerColor(); 
    }
}

function changePlayerColor() {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    player.color = randomColor;
}

function updateEnemies() {
    if (frame % enemySpawnRate === 0) {
        const size = Math.random() * 30 + 20;
        enemies.push({
            x: Math.random() * (canvas.width - size),
            y: -size,
            width: size,
            height: size
        });
    }

    for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].y += enemySpeed;

        if (enemies[i].y > canvas.height) {
            enemies.splice(i, 1);
        }

        if (detectCollision(player, enemies[i])) {
            alert('Игра окончена!');
            document.location.reload();
        }
    }
}

function detectCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawEnemies();
    updatePlayer();
    updateEnemies();
    frame++;
    requestAnimationFrame(gameLoop);
}

const keys = {};
window.addEventListener('keydown', e => {
    keys[e.code] = true;
});
window.addEventListener('keyup', e => {
    keys[e.code] = false;
});

gameLoop();