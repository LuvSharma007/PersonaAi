import React, { useEffect, useRef } from 'react';

const MatrixEffect = ({ className = "", style = {} }) => {
  const canvasRef = useRef(null);
  const canvas2Ref = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvas2 = canvas2Ref.current;
    
    if (!canvas || !canvas2) return;

    const ctx = canvas.getContext('2d');
    const ctx2 = canvas2.getContext('2d');
    
    // Setup variables
    const charArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    const fontSize = 10;
    let cw = window.innerWidth;
    let ch = window.innerHeight;
    let maxColumns = Math.floor(cw / fontSize);
    let fallingCharArr = [];

    // Set canvas dimensions
    const setCanvasSize = () => {
      cw = window.innerWidth;
      ch = window.innerHeight;
      maxColumns = Math.floor(cw / fontSize);
      
      canvas.width = canvas2.width = cw;
      canvas.height = canvas2.height = ch;
    };

    setCanvasSize();

    // Utility functions
    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    function randomFloat(min, max) {
      return Math.random() * (max - min) + min;
    }

    // Point constructor
    function Point(x, y) {
      this.x = x;
      this.y = y;
      this.value = charArr[randomInt(0, charArr.length - 1)].toUpperCase();
      this.speed = randomFloat(1, 5);
    }

    Point.prototype.draw = function() {
      this.value = charArr[randomInt(0, charArr.length - 1)].toUpperCase();
      
      // More transparent white characters on canvas2
      ctx2.fillStyle = "rgba(255,255,255,0.3)";
      ctx2.font = fontSize + "px monospace";
      ctx2.fillText(this.value, this.x, this.y);
      
      // More transparent green characters on main canvas
      ctx.fillStyle = "rgba(0,255,0,0.6)";
      ctx.font = fontSize + "px monospace";
      ctx.fillText(this.value, this.x, this.y);
      
      this.y += this.speed;
      
      if (this.y > ch) {
        this.y = randomFloat(-100, 0);
        this.speed = randomFloat(2, 5);
      }
    };

    // Initialize falling characters
    for (let i = 0; i < maxColumns; i++) {
      fallingCharArr.push(new Point(i * fontSize, randomFloat(-500, 0)));
    }

    // Animation loop
    const update = () => {
      // Make the fade effect more transparent to show background
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.fillRect(0, 0, cw, ch);
      ctx2.clearRect(0, 0, cw, ch);
      
      let i = fallingCharArr.length;
      while (i--) {
        fallingCharArr[i].draw();
      }
      
      animationRef.current = requestAnimationFrame(update);
    };

    // Handle window resize
    const handleResize = () => {
      setCanvasSize();
      fallingCharArr = [];
      maxColumns = Math.floor(cw / fontSize);
      
      for (let i = 0; i < maxColumns; i++) {
        fallingCharArr.push(new Point(i * fontSize, randomFloat(-500, 0)));
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Start animation
    update();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={className} style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%',
      pointerEvents: 'none', // Allow clicks to pass through
      ...style 
    }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        Canvas is not supported in your browser.
      </canvas>
      <canvas
        ref={canvas2Ref}
        style={{
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        Canvas is not supported in your browser.
      </canvas>
    </div>
  );
};

export default MatrixEffect;