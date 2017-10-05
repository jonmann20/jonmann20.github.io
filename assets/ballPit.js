'use strict';

class BallPit {
    constructor() {
        this.boundOnRoute = (e) => this.destroy(e.detail);
        addEventListener('route', this.boundOnRoute, pListen ? {passive: true} : false);

        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.radius = 16.5;
        this.balls = [];

        this.canvas.width = util.getMainWidth() / 1.5;
        this.canvas.height = this.canvas.width / 2;

        // set up modifications
        this.boundOnNumBalls = (e) => this.onNumBalls(e.target.value);
        this.boundOnSizeBalls = (e) => this.onSizeBalls(e.target.value);
        this.boundOnSpeedBalls = (e) => this.onSpeedBalls(e.target.value);

        document.querySelector('.numBalls').addEventListener('input', this.boundOnNumBalls);
        document.querySelector('.sizeBalls').addEventListener('input', this.boundOnSizeBalls);
        document.querySelector('.speedBalls').addEventListener('input', this.boundOnSpeedBalls);

        // initialize the array of balls
        for(let i=0; i < 20; ++i) {
            this.balls.push({
                x: Math.floor(Math.random() * (this.canvas.width + 1)),
                y: Math.floor(Math.random() * (this.canvas.height + 1)),
                velocity: {
                    x: Math.floor(Math.random() * (-3)),  // [-2, 2]
                    y: Math.floor(Math.random() * 7) - 3  // [-3, 3]
                },
                color: this.getRandomColor()
            });
        }

        this.runSim();
    }

    destroy(page) {
        if(page === '#playground/ball-pit') {
            return;
        }

        removeEventListener('route', this.boundOnRoute, pListen ? {passive: true} : false);
        cancelAnimationFrame(this.animLoop);

        const numBalls = document.querySelector('.numBalls');
        const sizeBalls = document.querySelector('.sizeBalls');
        const speedBalls = document.querySelector('.speedBalls');

        if(numBalls) {
            numBalls.removeEventListener('input', this.boundOnNumBalls);
        }

        if(sizeBalls) {
           sizeBalls.removeEventListener('input', this.boundOnSizeBalls);
        }

        if(speedBalls) {
            speedBalls.removeEventListener('input', this.boundOnSpeedBalls);
        }

        delete window.ballPit;
    }

    update() {
        for(let ball of this.balls) {
            // update position
            ball.x += ball.velocity.x;
            ball.y += ball.velocity.y;

            // detect collisions
            if((ball.x - this.radius) < 0 && ball.velocity.x < 0) {
                ball.velocity.x = -ball.velocity.x;
            }

            if(ball.y >= (this.canvas.height - this.radius) && ball.velocity.y > 0) {
                ball.velocity.y = -ball.velocity.y;
            }

            if(ball.x >= (this.canvas.width - this.radius) && ball.velocity.x > 0) {
                ball.velocity.x = -ball.velocity.x;
            }

            if((ball.y - this.radius) < 0 && ball.velocity.y < 0) {
                ball.velocity.y = -ball.velocity.y;
            }
        }
    }

    render() {
        // draw background
        this.ctx.fillStyle = '#0098ff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // draw balls
        for(const ball of this.balls) {
            this.ctx.fillStyle = ball.color;
            this.ctx.beginPath();
            this.ctx.arc(ball.x, ball.y, this.radius, 0, 2 * Math.PI, false);
            this.ctx.fill();
        }
    }

    runSim() {
        this.update();
        this.render();

        this.animLoop = requestAnimationFrame(() => this.runSim());
    }

    fixArr(num) {
        let i=0, diff = this.balls.length - num;

        if(diff > 0) {
            for(; i < diff; ++i) {
                this.balls.pop();
            }
        }
        else if(diff < 0) {
            diff = -diff;

            for(; i < diff; ++i) {
                let ball = {						// (max   - min + 1)  + min
                    x: Math.floor(Math.random() * (this.canvas.width - 0 + 1)) + 0, // [0, canvas.width]
                    y: Math.floor(Math.random() * (this.canvas.height + 1)),        // [0, canvas.height]
                    velocity: {
                        x: Math.floor(Math.random() * (2 - (-2) + 1)) + (-2),       // [-2, 2]
                        y: Math.floor(Math.random() * (3 - (-3) + 1)) + (-3)        // [-3, 3]
                    },
                    color: this.getRandomColor()
                };

                if(ball.velocity.x === 0) {
                    ball.velocity.x = 1;
                }

                if(ball.velocity.y === 0) {
                    ball.velocity.y = 1;
                }

                this.balls.push(ball);
            }
        }
    }

    updateUserSpeed(oldSpeed, newSpeed) {
        let originalVx, originalVy;

        for(let ball of this.balls) {
            originalVx = ball.velocity.x / oldSpeed;
            originalVy = ball.velocity.y / oldSpeed;

            ball.velocity.x = originalVx * newSpeed;
            ball.velocity.y = originalVy * newSpeed;
        }
    }

    onNumBalls(num) {
        document.querySelector('.litNumBalls').textContent = num;
        this.fixArr(num);
    }

    onSizeBalls(num) {
        document.querySelector('.litSizeBalls').textContent = num;
        this.radius = num;
    }

    onSpeedBalls(num) {
        this.updateUserSpeed(document.querySelector('.litSpeedBalls').textContent, num);
        document.querySelector('.litSpeedBalls').textContent = num;
    }

    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';

        for(let i=0; i < 6; ++i) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJiYWxsUGl0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgQmFsbFBpdCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm91bmRPblJvdXRlID0gKGUpID0+IHRoaXMuZGVzdHJveShlLmRldGFpbCk7XG4gICAgICAgIGFkZEV2ZW50TGlzdGVuZXIoJ3JvdXRlJywgdGhpcy5ib3VuZE9uUm91dGUsIHBMaXN0ZW4gPyB7cGFzc2l2ZTogdHJ1ZX0gOiBmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB0aGlzLnJhZGl1cyA9IDE2LjU7XG4gICAgICAgIHRoaXMuYmFsbHMgPSBbXTtcblxuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHV0aWwuZ2V0TWFpbldpZHRoKCkgLyAxLjU7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuY2FudmFzLndpZHRoIC8gMjtcblxuICAgICAgICAvLyBzZXQgdXAgbW9kaWZpY2F0aW9uc1xuICAgICAgICB0aGlzLmJvdW5kT25OdW1CYWxscyA9IChlKSA9PiB0aGlzLm9uTnVtQmFsbHMoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICB0aGlzLmJvdW5kT25TaXplQmFsbHMgPSAoZSkgPT4gdGhpcy5vblNpemVCYWxscyhlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgIHRoaXMuYm91bmRPblNwZWVkQmFsbHMgPSAoZSkgPT4gdGhpcy5vblNwZWVkQmFsbHMoZS50YXJnZXQudmFsdWUpO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5udW1CYWxscycpLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy5ib3VuZE9uTnVtQmFsbHMpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2l6ZUJhbGxzJykuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLmJvdW5kT25TaXplQmFsbHMpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BlZWRCYWxscycpLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy5ib3VuZE9uU3BlZWRCYWxscyk7XG5cbiAgICAgICAgLy8gaW5pdGlhbGl6ZSB0aGUgYXJyYXkgb2YgYmFsbHNcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCAyMDsgKytpKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxzLnB1c2goe1xuICAgICAgICAgICAgICAgIHg6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh0aGlzLmNhbnZhcy53aWR0aCArIDEpKSxcbiAgICAgICAgICAgICAgICB5OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAodGhpcy5jYW52YXMuaGVpZ2h0ICsgMSkpLFxuICAgICAgICAgICAgICAgIHZlbG9jaXR5OiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgtMykpLCAgLy8gWy0yLCAyXVxuICAgICAgICAgICAgICAgICAgICB5OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA3KSAtIDMgIC8vIFstMywgM11cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbG9yOiB0aGlzLmdldFJhbmRvbUNvbG9yKClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ydW5TaW0oKTtcbiAgICB9XG5cbiAgICBkZXN0cm95KHBhZ2UpIHtcbiAgICAgICAgaWYocGFnZSA9PT0gJyNwbGF5Z3JvdW5kL2JhbGwtcGl0Jykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcigncm91dGUnLCB0aGlzLmJvdW5kT25Sb3V0ZSwgcExpc3RlbiA/IHtwYXNzaXZlOiB0cnVlfSA6IGZhbHNlKTtcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltTG9vcCk7XG5cbiAgICAgICAgY29uc3QgbnVtQmFsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubnVtQmFsbHMnKTtcbiAgICAgICAgY29uc3Qgc2l6ZUJhbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpemVCYWxscycpO1xuICAgICAgICBjb25zdCBzcGVlZEJhbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNwZWVkQmFsbHMnKTtcblxuICAgICAgICBpZihudW1CYWxscykge1xuICAgICAgICAgICAgbnVtQmFsbHMucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLmJvdW5kT25OdW1CYWxscyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihzaXplQmFsbHMpIHtcbiAgICAgICAgICAgc2l6ZUJhbGxzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy5ib3VuZE9uU2l6ZUJhbGxzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHNwZWVkQmFsbHMpIHtcbiAgICAgICAgICAgIHNwZWVkQmFsbHMucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLmJvdW5kT25TcGVlZEJhbGxzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZSB3aW5kb3cuYmFsbFBpdDtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGZvcihsZXQgYmFsbCBvZiB0aGlzLmJhbGxzKSB7XG4gICAgICAgICAgICAvLyB1cGRhdGUgcG9zaXRpb25cbiAgICAgICAgICAgIGJhbGwueCArPSBiYWxsLnZlbG9jaXR5Lng7XG4gICAgICAgICAgICBiYWxsLnkgKz0gYmFsbC52ZWxvY2l0eS55O1xuXG4gICAgICAgICAgICAvLyBkZXRlY3QgY29sbGlzaW9uc1xuICAgICAgICAgICAgaWYoKGJhbGwueCAtIHRoaXMucmFkaXVzKSA8IDAgJiYgYmFsbC52ZWxvY2l0eS54IDwgMCkge1xuICAgICAgICAgICAgICAgIGJhbGwudmVsb2NpdHkueCA9IC1iYWxsLnZlbG9jaXR5Lng7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGJhbGwueSA+PSAodGhpcy5jYW52YXMuaGVpZ2h0IC0gdGhpcy5yYWRpdXMpICYmIGJhbGwudmVsb2NpdHkueSA+IDApIHtcbiAgICAgICAgICAgICAgICBiYWxsLnZlbG9jaXR5LnkgPSAtYmFsbC52ZWxvY2l0eS55O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihiYWxsLnggPj0gKHRoaXMuY2FudmFzLndpZHRoIC0gdGhpcy5yYWRpdXMpICYmIGJhbGwudmVsb2NpdHkueCA+IDApIHtcbiAgICAgICAgICAgICAgICBiYWxsLnZlbG9jaXR5LnggPSAtYmFsbC52ZWxvY2l0eS54O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZigoYmFsbC55IC0gdGhpcy5yYWRpdXMpIDwgMCAmJiBiYWxsLnZlbG9jaXR5LnkgPCAwKSB7XG4gICAgICAgICAgICAgICAgYmFsbC52ZWxvY2l0eS55ID0gLWJhbGwudmVsb2NpdHkueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgLy8gZHJhdyBiYWNrZ3JvdW5kXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjMDA5OGZmJztcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG5cbiAgICAgICAgLy8gZHJhdyBiYWxsc1xuICAgICAgICBmb3IoY29uc3QgYmFsbCBvZiB0aGlzLmJhbGxzKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBiYWxsLmNvbG9yO1xuICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5hcmMoYmFsbC54LCBiYWxsLnksIHRoaXMucmFkaXVzLCAwLCAyICogTWF0aC5QSSwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcnVuU2ltKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuXG4gICAgICAgIHRoaXMuYW5pbUxvb3AgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5ydW5TaW0oKSk7XG4gICAgfVxuXG4gICAgZml4QXJyKG51bSkge1xuICAgICAgICBsZXQgaT0wLCBkaWZmID0gdGhpcy5iYWxscy5sZW5ndGggLSBudW07XG5cbiAgICAgICAgaWYoZGlmZiA+IDApIHtcbiAgICAgICAgICAgIGZvcig7IGkgPCBkaWZmOyArK2kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJhbGxzLnBvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZGlmZiA8IDApIHtcbiAgICAgICAgICAgIGRpZmYgPSAtZGlmZjtcblxuICAgICAgICAgICAgZm9yKDsgaSA8IGRpZmY7ICsraSkge1xuICAgICAgICAgICAgICAgIGxldCBiYWxsID0ge1x0XHRcdFx0XHRcdC8vIChtYXggICAtIG1pbiArIDEpICArIG1pblxuICAgICAgICAgICAgICAgICAgICB4OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAodGhpcy5jYW52YXMud2lkdGggLSAwICsgMSkpICsgMCwgLy8gWzAsIGNhbnZhcy53aWR0aF1cbiAgICAgICAgICAgICAgICAgICAgeTogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHRoaXMuY2FudmFzLmhlaWdodCArIDEpKSwgICAgICAgIC8vIFswLCBjYW52YXMuaGVpZ2h0XVxuICAgICAgICAgICAgICAgICAgICB2ZWxvY2l0eToge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDIgLSAoLTIpICsgMSkpICsgKC0yKSwgICAgICAgLy8gWy0yLCAyXVxuICAgICAgICAgICAgICAgICAgICAgICAgeTogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDMgLSAoLTMpICsgMSkpICsgKC0zKSAgICAgICAgLy8gWy0zLCAzXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5nZXRSYW5kb21Db2xvcigpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmKGJhbGwudmVsb2NpdHkueCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBiYWxsLnZlbG9jaXR5LnggPSAxO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGJhbGwudmVsb2NpdHkueSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBiYWxsLnZlbG9jaXR5LnkgPSAxO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuYmFsbHMucHVzaChiYWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVVzZXJTcGVlZChvbGRTcGVlZCwgbmV3U3BlZWQpIHtcbiAgICAgICAgbGV0IG9yaWdpbmFsVngsIG9yaWdpbmFsVnk7XG5cbiAgICAgICAgZm9yKGxldCBiYWxsIG9mIHRoaXMuYmFsbHMpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsVnggPSBiYWxsLnZlbG9jaXR5LnggLyBvbGRTcGVlZDtcbiAgICAgICAgICAgIG9yaWdpbmFsVnkgPSBiYWxsLnZlbG9jaXR5LnkgLyBvbGRTcGVlZDtcblxuICAgICAgICAgICAgYmFsbC52ZWxvY2l0eS54ID0gb3JpZ2luYWxWeCAqIG5ld1NwZWVkO1xuICAgICAgICAgICAgYmFsbC52ZWxvY2l0eS55ID0gb3JpZ2luYWxWeSAqIG5ld1NwZWVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25OdW1CYWxscyhudW0pIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpdE51bUJhbGxzJykudGV4dENvbnRlbnQgPSBudW07XG4gICAgICAgIHRoaXMuZml4QXJyKG51bSk7XG4gICAgfVxuXG4gICAgb25TaXplQmFsbHMobnVtKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXRTaXplQmFsbHMnKS50ZXh0Q29udGVudCA9IG51bTtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSBudW07XG4gICAgfVxuXG4gICAgb25TcGVlZEJhbGxzKG51bSkge1xuICAgICAgICB0aGlzLnVwZGF0ZVVzZXJTcGVlZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGl0U3BlZWRCYWxscycpLnRleHRDb250ZW50LCBudW0pO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGl0U3BlZWRCYWxscycpLnRleHRDb250ZW50ID0gbnVtO1xuICAgIH1cblxuICAgIGdldFJhbmRvbUNvbG9yKCkge1xuICAgICAgICBjb25zdCBsZXR0ZXJzID0gJzAxMjM0NTY3ODlBQkNERUYnO1xuICAgICAgICBsZXQgY29sb3IgPSAnIyc7XG5cbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCA2OyArK2kpIHtcbiAgICAgICAgICAgIGNvbG9yICs9IGxldHRlcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTYpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb2xvcjtcbiAgICB9XG59Il0sImZpbGUiOiJiYWxsUGl0LmpzIn0=
