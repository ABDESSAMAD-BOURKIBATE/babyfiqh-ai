
import React, { useState, useEffect, useRef } from 'react';
import { Language, translations } from '../../utils/translations';
import { ArrowIcon } from '../LandingPage';
import { ShieldCheckIcon } from '../icons/ShieldCheckIcon';
import { SparklesIcon } from '../icons/SparklesIcon';

interface GuardiansOfPurityGameProps {
    onBack: () => void;
    currentLang: Language;
    dir: 'rtl' | 'ltr';
}

// --- Game Constants ---
const COLORS = {
    bg: '#0f172a',
    heart: '#ffffff',
    eye: '#f43f5e', // Red/Pink for Images
    cloud: '#a8a29e', // Grey/Toxic for Words
    bug: '#eab308', // Yellow for Viruses
    beamGaze: '#3b82f6', // Blue
    beamModesty: '#f472b6', // Pink
    beamSafety: '#10b981', // Emerald
};

type EnemyType = 'eye' | 'cloud' | 'bug';

interface Entity {
    id: number;
    x: number;
    y: number;
    type: EnemyType;
    speed: number;
    radius: number;
    angle: number; // Angle from center
    distance: number; // Distance from center
    active: boolean;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    color: string;
}

interface Beam {
    targetX: number;
    targetY: number;
    color: string;
    life: number;
}

export const GuardiansOfPurityGame: React.FC<GuardiansOfPurityGameProps> = ({ onBack, currentLang, dir }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [health, setHealth] = useState(100);
    const [gameOver, setGameOver] = useState(false);
    const [gameTime, setGameTime] = useState(0);
    
    // Game State Refs (Mutable for Game Loop)
    const stateRef = useRef({
        enemies: [] as Entity[],
        particles: [] as Particle[],
        beams: [] as Beam[],
        score: 0,
        health: 100,
        lastSpawn: 0,
        gameOver: false,
        difficulty: 1,
        frameCount: 0
    });

    const t = translations[currentLang].ui.games;
    const tGuardians = translations[currentLang].ui.games.guardians;

    const resetGame = () => {
        stateRef.current = {
            enemies: [],
            particles: [],
            beams: [],
            score: 0,
            health: 100,
            lastSpawn: 0,
            gameOver: false,
            difficulty: 1,
            frameCount: 0
        };
        setScore(0);
        setHealth(100);
        setGameOver(false);
        setGameTime(0);
    };

    const spawnEnemy = (width: number, height: number) => {
        const types: EnemyType[] = ['eye', 'cloud', 'bug'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        // Spawn at edge of a circle larger than screen
        const angle = Math.random() * Math.PI * 2;
        const spawnRadius = Math.max(width, height) / 2 + 50;
        
        stateRef.current.enemies.push({
            id: Date.now() + Math.random(),
            x: width/2 + Math.cos(angle) * spawnRadius,
            y: height/2 + Math.sin(angle) * spawnRadius,
            type,
            speed: (1 + Math.random() * 0.5) * stateRef.current.difficulty,
            radius: 20,
            angle: angle,
            distance: spawnRadius,
            active: true
        });
    };

    const fireAbility = (type: EnemyType) => {
        if (stateRef.current.gameOver) return;

        const { enemies } = stateRef.current;
        const width = canvasRef.current?.width || 0;
        const height = canvasRef.current?.height || 0;

        // Find nearest enemy of this type
        let nearest: Entity | null = null;
        let minDist = Infinity;

        enemies.forEach(e => {
            if (e.active && e.type === type) {
                if (e.distance < minDist) {
                    minDist = e.distance;
                    nearest = e;
                }
            }
        });

        if (nearest) {
            // Hit!
            (nearest as Entity).active = false;
            stateRef.current.score += 10;
            setScore(stateRef.current.score);

            // Color based on type
            let color = COLORS.beamGaze;
            if (type === 'cloud') color = COLORS.beamModesty;
            if (type === 'bug') color = COLORS.beamSafety;

            // Create Beam Visual
            stateRef.current.beams.push({
                targetX: (nearest as Entity).x,
                targetY: (nearest as Entity).y,
                color: color,
                life: 10
            });

            // Create Explosion Particles
            for(let i=0; i<10; i++) {
                stateRef.current.particles.push({
                    x: (nearest as Entity).x,
                    y: (nearest as Entity).y,
                    vx: (Math.random() - 0.5) * 10,
                    vy: (Math.random() - 0.5) * 10,
                    life: 20 + Math.random() * 10,
                    color: color
                });
            }
        } else {
            // Miss penalty (optional, maybe just sound)
        }
    };

    // --- Game Loop ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const render = (time: number) => {
            if (stateRef.current.gameOver) return;

            const width = canvas.width;
            const height = canvas.height;
            const centerX = width / 2;
            const centerY = height / 2;

            stateRef.current.frameCount++;
            
            // Difficulty ramping
            if (stateRef.current.frameCount % 600 === 0) {
                stateRef.current.difficulty += 0.1;
            }

            // Spawning
            const spawnRate = Math.max(20, 60 - stateRef.current.difficulty * 5);
            if (time - stateRef.current.lastSpawn > spawnRate * 16) { // Approx every X frames
                spawnEnemy(width, height);
                stateRef.current.lastSpawn = time;
            }

            // Clear
            ctx.fillStyle = COLORS.bg;
            ctx.fillRect(0, 0, width, height);

            // Draw Core (Heart)
            const pulse = 1 + Math.sin(time / 200) * 0.05;
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.scale(pulse, pulse);
            ctx.shadowBlur = 20;
            ctx.shadowColor = COLORS.heart;
            ctx.fillStyle = COLORS.heart;
            
            // Heart Shape
            ctx.beginPath();
            ctx.moveTo(0, 10);
            ctx.bezierCurveTo(0, 12, -5, 25, -25, 25);
            ctx.bezierCurveTo(-55, 25, -55, -10, -55, -10);
            ctx.bezierCurveTo(-55, -40, -35, -52, 0, -20);
            ctx.bezierCurveTo(35, -52, 55, -40, 55, -10);
            ctx.bezierCurveTo(55, -10, 55, 25, 25, 25);
            ctx.bezierCurveTo(5, 25, 0, 12, 0, 10);
            ctx.fill();
            ctx.restore();

            // Process Enemies
            stateRef.current.enemies.forEach(enemy => {
                if (!enemy.active) return;

                // Move towards center
                const dx = centerX - enemy.x;
                const dy = centerY - enemy.y;
                const angle = Math.atan2(dy, dx);
                enemy.x += Math.cos(angle) * enemy.speed;
                enemy.y += Math.sin(angle) * enemy.speed;
                
                // Recalculate distance
                enemy.distance = Math.sqrt(dx*dx + dy*dy);

                // Collision with Heart
                if (enemy.distance < 40) {
                    enemy.active = false;
                    stateRef.current.health -= 10;
                    setHealth(stateRef.current.health);
                    
                    // Screen Shake effect (visual only here, could translate canvas)
                    ctx.fillStyle = 'rgba(255,0,0,0.3)';
                    ctx.fillRect(0,0,width,height);

                    if (stateRef.current.health <= 0) {
                        stateRef.current.gameOver = true;
                        setGameOver(true);
                    }
                }

                // Draw Enemy
                ctx.save();
                ctx.translate(enemy.x, enemy.y);
                
                if (enemy.type === 'eye') {
                    ctx.fillStyle = COLORS.eye;
                    ctx.beginPath();
                    ctx.ellipse(0, 0, 15, 10, 0, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = '#fff';
                    ctx.beginPath();
                    ctx.arc(0, 0, 5, 0, Math.PI * 2);
                    ctx.fill();
                } else if (enemy.type === 'cloud') {
                    ctx.fillStyle = COLORS.cloud;
                    ctx.beginPath();
                    ctx.arc(0, 0, 15, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(-10, 5, 10, 0, Math.PI * 2);
                    ctx.arc(10, 5, 10, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    ctx.fillStyle = COLORS.bug;
                    ctx.beginPath();
                    ctx.arc(0, 0, 12, 0, Math.PI * 2);
                    ctx.fill();
                    // Legs
                    ctx.strokeStyle = COLORS.bug;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(-12, -5); ctx.lineTo(-20, -10);
                    ctx.moveTo(12, -5); ctx.lineTo(20, -10);
                    ctx.moveTo(-12, 5); ctx.lineTo(-20, 10);
                    ctx.moveTo(12, 5); ctx.lineTo(20, 10);
                    ctx.stroke();
                }
                ctx.restore();
            });

            // Process Beams
            stateRef.current.beams = stateRef.current.beams.filter(beam => beam.life > 0);
            stateRef.current.beams.forEach(beam => {
                ctx.strokeStyle = beam.color;
                ctx.lineWidth = beam.life; // Thin out
                ctx.lineCap = 'round';
                ctx.shadowBlur = 15;
                ctx.shadowColor = beam.color;
                
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(beam.targetX, beam.targetY);
                ctx.stroke();
                
                ctx.shadowBlur = 0;
                beam.life -= 1;
            });

            // Process Particles
            stateRef.current.particles = stateRef.current.particles.filter(p => p.life > 0);
            stateRef.current.particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 1;
                
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life / 20;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            });

            // Cleanup dead enemies
            stateRef.current.enemies = stateRef.current.enemies.filter(e => e.active);

            animationFrameId = requestAnimationFrame(() => render(performance.now()));
        };

        // Initial Resize
        const resize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }
        };
        window.addEventListener('resize', resize);
        resize();

        animationFrameId = requestAnimationFrame(() => render(performance.now()));

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div className="flex flex-col h-full relative bg-[#0f172a] overflow-hidden">
            
            {/* Game Overlay HUD */}
            <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-start pointer-events-none">
                <div className="pointer-events-auto">
                    <button onClick={onBack} className="p-2 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 text-white transition-colors">
                        <ArrowIcon className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                    </button>
                </div>
                
                <div className="flex flex-col items-center">
                    <h2 className="text-white font-amiri font-bold text-xl drop-shadow-md">{t.guardians.title}</h2>
                    <div className="flex items-center gap-4 mt-2 bg-black/30 px-4 py-1 rounded-full backdrop-blur-sm border border-white/10">
                        <span className="text-amber-400 font-mono font-bold">{score}</span>
                        <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                                className={`h-full transition-all duration-300 ${health > 50 ? 'bg-emerald-500' : 'bg-red-500'}`} 
                                style={{ width: `${health}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
                
                <div className="w-10"></div> {/* Spacer */}
            </div>

            {/* Game Canvas */}
            <div className="flex-grow relative">
                <canvas ref={canvasRef} className="w-full h-full block" />
                
                {/* Game Over Screen */}
                {gameOver && (
                    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in p-6 text-center">
                        <ShieldCheckIcon className="w-24 h-24 text-red-500 mb-4" />
                        <h2 className="text-3xl font-bold text-white mb-2">{t.gameOver}</h2>
                        <p className="text-white/60 mb-6">{currentLang === 'ar' ? 'حافظ على طهارة قلبك دائماً' : 'Always keep your heart pure'}</p>
                        <div className="text-4xl font-mono font-bold text-amber-400 mb-8">{score}</div>
                        
                        <button 
                            onClick={resetGame}
                            className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold text-lg shadow-lg transition-transform hover:scale-105"
                        >
                            {t.playAgain}
                        </button>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="h-32 bg-[#1e293b] border-t border-white/10 p-4 flex justify-center gap-4 md:gap-8 relative z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
                <button 
                    className="flex-1 max-w-[120px] flex flex-col items-center justify-center bg-blue-900/50 border-2 border-blue-500/50 rounded-2xl active:scale-95 transition-all hover:bg-blue-800/50 shadow-[0_0_15px_rgba(59,130,246,0.3)] group"
                    onClick={() => fireAbility('eye')}
                >
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mb-2 group-hover:animate-pulse">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/><line x1="2" x2="22" y1="2" y2="22" className="opacity-50"/></svg>
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-blue-200">{tGuardians.tools.gaze}</span>
                </button>

                <button 
                    className="flex-1 max-w-[120px] flex flex-col items-center justify-center bg-pink-900/50 border-2 border-pink-500/50 rounded-2xl active:scale-95 transition-all hover:bg-pink-800/50 shadow-[0_0_15px_rgba(244,114,182,0.3)] group"
                    onClick={() => fireAbility('cloud')}
                >
                    <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center mb-2 group-hover:animate-pulse">
                        <SparklesIcon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-pink-200">{tGuardians.tools.modesty}</span>
                </button>

                <button 
                    className="flex-1 max-w-[120px] flex flex-col items-center justify-center bg-emerald-900/50 border-2 border-emerald-500/50 rounded-2xl active:scale-95 transition-all hover:bg-emerald-800/50 shadow-[0_0_15px_rgba(16,185,129,0.3)] group"
                    onClick={() => fireAbility('bug')}
                >
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center mb-2 group-hover:animate-pulse">
                        <ShieldCheckIcon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-emerald-200">{tGuardians.tools.safety}</span>
                </button>
            </div>
        </div>
    );
};
