import React, { useState, useEffect } from 'react';
import { Language, translations } from '../../utils/translations';
import { QuizLevel, QuizProgress, GameSession } from './quizTypes';
import { allLevels } from './quizData';
import { logChildActivity } from '../../utils/userData';
import {
    Heart,
    Flame,
    Clock,
    X,
    ChevronRight,
    ChevronLeft,
    RotateCcw,
    Home,
    CheckCircle,
    XCircle,
    Trophy,
    Star,
    Lock,
    BookOpen,
    Award,
    Moon,
    Sun,
    Calendar,
    Users
} from 'lucide-react';

interface AdvancedQuizGameProps {
    currentLang: Language;
    onClose: () => void;
}

// Shuffle array helper
const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// Helper to get icon for level
const getLevelIcon = (levelId: number) => {
    switch (levelId) {
        case 1: return <BookOpen className="w-8 h-8" />;
        case 2: return <BookOpen className="w-8 h-8" />;
        case 3: return <BookOpen className="w-8 h-8" />;
        case 4: return <Users className="w-8 h-8" />;
        case 10: return <Moon className="w-8 h-8" />;
        case 6: return <Sun className="w-8 h-8" />;
        case 8: return <Calendar className="w-8 h-8" />;
        default: return <Award className="w-8 h-8" />;
    }
};

export const AdvancedQuizGame: React.FC<AdvancedQuizGameProps> = ({ currentLang, onClose }) => {
    const t = translations[currentLang].ui;
    const [progress, setProgress] = useState<QuizProgress>(() => {
        const saved = localStorage.getItem('quizProgress');
        return saved ? JSON.parse(saved) : {
            completedLevels: [],
            levelScores: {},
            levelStars: {},
            currentLevel: 1,
            totalQuestionsAnswered: 0,
            correctAnswers: 0
        };
    });

    const [gameState, setGameState] = useState<'menu' | 'playing' | 'results' | 'gameover'>('menu');
    const [session, setSession] = useState<GameSession | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);

    // Save progress to localStorage
    useEffect(() => {
        localStorage.setItem('quizProgress', JSON.stringify(progress));
    }, [progress]);

    // Timer Logic
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (gameState === 'playing' && session && selectedAnswer === null && session.timeLeft > 0) {
            timer = setInterval(() => {
                setSession(prev => {
                    if (!prev) return null;
                    if (prev.timeLeft <= 1) {
                        // Time's up!
                        handleTimeUp();
                        return { ...prev, timeLeft: 0 };
                    }
                    return { ...prev, timeLeft: prev.timeLeft - 1 };
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [gameState, selectedAnswer, session?.timeLeft]);

    const startLevel = (levelId: number) => {
        const level = allLevels.find(l => l.id === levelId);
        if (!level) return;

        const shuffledQuestions = shuffleArray(level.questions);

        setSession({
            levelId,
            questions: shuffledQuestions,
            currentQuestionIndex: 0,
            score: 0,
            answeredQuestions: [],
            startTime: Date.now(),
            lives: 3,
            streak: 0,
            timeLeft: 30
        });
        setGameState('playing');
        setSelectedAnswer(null);
        setShowExplanation(false);

        // Log activity
        const childId = localStorage.getItem('currentChildId');
        if (childId) {
            logChildActivity(childId, {
                type: 'game',
                title: currentLang === 'ar' ? level.titleAr : level.titleEn,
                details: `Started quiz level ${levelId}`,
                topic: 'Islamic Quiz'
            });
        }
    };

    const handleTimeUp = () => {
        if (!session) return;
        setSelectedAnswer(-1); // -1 indicates time up
        setShowExplanation(true);

        // Lose a life
        const newLives = session.lives - 1;
        setSession(prev => prev ? {
            ...prev,
            lives: newLives,
            streak: 0,
            timeLeft: 0
        } : null);

        if (newLives <= 0) {
            setTimeout(() => setGameState('gameover'), 2000);
        }
    };

    const handleAnswer = (answerIndex: number) => {
        if (!session || selectedAnswer !== null) return;

        setSelectedAnswer(answerIndex);
        setShowExplanation(true);

        const currentQuestion = session.questions[session.currentQuestionIndex];
        const isCorrect = answerIndex === currentQuestion.correctAnswer;

        let newScore = session.score;
        let newLives = session.lives;
        let newStreak = session.streak;

        if (isCorrect) {
            newStreak += 1;
            // Bonus points for streak: +1 for every 3 streak
            const bonus = Math.floor(newStreak / 3);
            newScore += 1 + (bonus > 0 ? 0.5 : 0);

            // Heart Recovery: Regain 1 life every 10 streak if lives < 3
            if (newStreak % 10 === 0 && newLives < 3) {
                newLives += 1;
            }
        } else {
            newLives -= 1;
            newStreak = 0;
        }

        setSession(prev => prev ? {
            ...prev,
            score: isCorrect ? prev.score + 1 : prev.score,
            lives: newLives,
            streak: newStreak,
            answeredQuestions: [...prev.answeredQuestions, currentQuestion.id]
        } : null);

        if (newLives <= 0) {
            setTimeout(() => setGameState('gameover'), 2000);
        }
    };

    const nextQuestion = () => {
        if (!session) return;

        if (session.currentQuestionIndex < session.questions.length - 1) {
            setSession({
                ...session,
                currentQuestionIndex: session.currentQuestionIndex + 1,
                timeLeft: 30 // Reset timer
            });
            setSelectedAnswer(null);
            setShowExplanation(false);
        } else {
            finishLevel();
        }
    };

    const finishLevel = () => {
        if (!session) return;

        const level = allLevels.find(l => l.id === session.levelId);
        if (!level) return;

        const scorePercentage = (session.score / session.questions.length) * 100;
        const passed = scorePercentage >= level.requiredScore;

        let stars = 0;
        if (scorePercentage >= 90) stars = 3;
        else if (scorePercentage >= 75) stars = 2;
        else if (passed) stars = 1;

        const newProgress = {
            ...progress,
            levelScores: { ...progress.levelScores, [session.levelId]: scorePercentage },
            levelStars: { ...progress.levelStars, [session.levelId]: stars },
            completedLevels: passed && !progress.completedLevels.includes(session.levelId)
                ? [...progress.completedLevels, session.levelId]
                : progress.completedLevels,
            currentLevel: passed ? Math.max(progress.currentLevel, session.levelId + 1) : progress.currentLevel,
            totalQuestionsAnswered: progress.totalQuestionsAnswered + session.questions.length,
            correctAnswers: progress.correctAnswers + session.score
        };

        setProgress(newProgress);
        setGameState('results');

        // Log completion
        const childId = localStorage.getItem('currentChildId');
        if (childId) {
            logChildActivity(childId, {
                type: 'game',
                title: currentLang === 'ar' ? level.titleAr : level.titleEn,
                details: `Completed quiz level ${session.levelId} with ${scorePercentage.toFixed(0)}% score`,
                topic: 'Islamic Quiz'
            });
        }
    };

    const renderMenu = () => (
        <div className="p-6 space-y-6">
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-2">
                    <Trophy className="w-10 h-10 text-yellow-400" />
                    <h2 className="text-3xl font-bold text-white">
                        {currentLang === 'ar' ? 'فرسان الضاد' : 'Arabic Knights Quiz'}
                    </h2>
                </div>
                <p className="text-white/70">
                    {currentLang === 'ar'
                        ? `${t.currentLevel}: ${progress.currentLevel} | ${t.questionsAnswered}: ${progress.totalQuestionsAnswered}`
                        : `${t.currentLevel}: ${progress.currentLevel} | ${t.questionsAnswered}: ${progress.totalQuestionsAnswered}`
                    }
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allLevels.map((level) => {
                    const isLocked = false; // All levels unlocked
                    const isCompleted = progress.completedLevels.includes(level.id);
                    const stars = progress.levelStars[level.id] || 0;
                    const score = progress.levelScores[level.id];

                    return (
                        <button
                            key={level.id}
                            onClick={() => !isLocked && startLevel(level.id)}
                            disabled={isLocked}
                            className={`p-6 rounded-2xl border-2 transition-all relative overflow-hidden group ${isLocked
                                ? 'bg-white/5 border-white/10 cursor-not-allowed opacity-50'
                                : isCompleted
                                    ? 'bg-emerald-500/20 border-emerald-500/50 hover:bg-emerald-500/30'
                                    : 'bg-indigo-500/20 border-indigo-500/50 hover:bg-indigo-500/30'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl ${isLocked ? 'bg-white/10' : 'bg-white/20'}`}>
                                    {isLocked ? <Lock className="w-8 h-8 text-white/50" /> : getLevelIcon(level.id)}
                                </div>
                                {isCompleted && (
                                    <div className="flex gap-1">
                                        {[1, 2, 3].map((star) => (
                                            <Star
                                                key={star}
                                                className={`w-4 h-4 ${star <= stars ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <h3 className="text-lg font-bold text-white mb-2 text-right">
                                {currentLang === 'ar' ? level.titleAr : level.titleEn}
                            </h3>
                            <p className="text-sm text-white/70 mb-3 text-right">
                                {currentLang === 'ar' ? level.description : level.descriptionEn}
                            </p>

                            {score !== undefined && (
                                <div className="absolute bottom-4 left-4 text-sm font-bold text-white/90 bg-black/20 px-2 py-1 rounded-lg">
                                    {score.toFixed(0)}%
                                </div>
                            )}

                            <div className="absolute bottom-4 right-4 text-xs text-white/50">
                                {level.questions.length} {currentLang === 'ar' ? t.questions : t.questions}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );

    const renderGame = () => {
        if (!session) return null;

        const currentQuestion = session.questions[session.currentQuestionIndex];
        const progress_percent = ((session.currentQuestionIndex + 1) / session.questions.length) * 100;
        const timer_percent = (session.timeLeft / 30) * 100;

        return (
            <div className="p-6 max-w-4xl mx-auto">
                {/* Stats Bar */}
                <div className="flex justify-between items-center mb-6 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                        <Heart className={`w-6 h-6 ${session.lives < 2 ? 'text-red-500 animate-pulse' : 'text-red-500 fill-red-500'}`} />
                        <span className="text-xl font-bold text-white">{session.lives}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Flame className={`w-6 h-6 ${session.streak > 2 ? 'text-orange-500 fill-orange-500 animate-bounce' : 'text-orange-400'}`} />
                        <span className="text-xl font-bold text-orange-400">{session.streak}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Trophy className="w-6 h-6 text-yellow-400" />
                        <span className="text-xl font-bold text-white">
                            {session.score} / {session.questions.length}
                        </span>
                    </div>
                </div>

                {/* Timer Bar */}
                <div className="mb-6 relative h-3 bg-white/10 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center z-10">
                        <Clock className="w-3 h-3 text-white/20" />
                    </div>
                    <div
                        className={`absolute top-0 left-0 h-full transition-all duration-1000 linear ${session.timeLeft < 10 ? 'bg-red-500' : 'bg-emerald-500'
                            }`}
                        style={{ width: `${timer_percent}%` }}
                    />
                </div>

                {/* Question */}
                <div className="bg-white/10 rounded-2xl p-8 mb-6 relative overflow-hidden min-h-[200px] flex flex-col justify-center items-center text-center border border-white/5 shadow-xl">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>

                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 relative z-10 leading-relaxed">
                        {currentLang === 'ar' ? currentQuestion.question : currentQuestion.questionEn}
                    </h3>

                    <div className="relative z-10">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${currentQuestion.difficulty === 'easy' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                            currentQuestion.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                                'bg-red-500/20 text-red-300 border border-red-500/30'
                            }`}>
                            {currentQuestion.difficulty === 'easy' ? (currentLang === 'ar' ? t.easy : t.easy) :
                                currentQuestion.difficulty === 'medium' ? (currentLang === 'ar' ? t.medium : t.medium) :
                                    (currentLang === 'ar' ? t.hard : t.hard)}
                        </span>
                    </div>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {currentQuestion.options.map((option, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrect = index === currentQuestion.correctAnswer;
                        const showResult = selectedAnswer !== null;

                        return (
                            <button
                                key={index}
                                onClick={() => handleAnswer(index)}
                                disabled={selectedAnswer !== null}
                                className={`p-6 rounded-xl border-2 font-bold text-lg transition-all transform relative overflow-hidden ${showResult
                                    ? isCorrect
                                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 scale-102 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                                        : isSelected
                                            ? 'bg-red-500/20 border-red-500 text-red-300 shake'
                                            : 'bg-white/5 border-white/10 text-white/30 opacity-50'
                                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40 hover:scale-102 hover:shadow-lg'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span>{currentLang === 'ar' ? option : currentQuestion.optionsEn[index]}</span>
                                    {showResult && isCorrect && <CheckCircle className="w-6 h-6 text-emerald-400" />}
                                    {showResult && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-400" />}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Explanation */}
                {showExplanation && (
                    <div className={`rounded-xl p-6 mb-6 animate-fade-in border ${selectedAnswer === -1 || (selectedAnswer !== null && selectedAnswer !== session.questions[session.currentQuestionIndex].correctAnswer)
                        ? 'bg-red-500/10 border-red-500/30'
                        : 'bg-emerald-500/10 border-emerald-500/30'
                        }`}>
                        <div className="flex items-center gap-3 mb-2">
                            {selectedAnswer === -1 || (selectedAnswer !== null && selectedAnswer !== session.questions[session.currentQuestionIndex].correctAnswer)
                                ? <XCircle className="w-6 h-6 text-red-400" />
                                : <CheckCircle className="w-6 h-6 text-emerald-400" />
                            }
                            <h4 className={`font-bold text-lg ${selectedAnswer === -1 || (selectedAnswer !== null && selectedAnswer !== session.questions[session.currentQuestionIndex].correctAnswer)
                                ? 'text-red-300'
                                : 'text-emerald-300'
                                }`}>
                                {selectedAnswer === -1
                                    ? (currentLang === 'ar' ? t.timesUp : t.timesUp)
                                    : (selectedAnswer !== session.questions[session.currentQuestionIndex].correctAnswer
                                        ? (currentLang === 'ar' ? t.wrongAnswer : t.wrongAnswer)
                                        : (currentLang === 'ar' ? t.correctAnswer : t.correctAnswer)
                                    )
                                }
                            </h4>
                        </div>
                        {currentQuestion.explanation && (
                            <p className="text-white/80 leading-relaxed mr-9">
                                {currentLang === 'ar' ? currentQuestion.explanation : currentQuestion.explanationEn}
                            </p>
                        )}
                    </div>
                )}

                {/* Next Button */}
                {selectedAnswer !== null && (
                    <button
                        onClick={nextQuestion}
                        className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl font-bold text-white text-lg transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 group"
                    >
                        {session.currentQuestionIndex < session.questions.length - 1
                            ? (
                                <>
                                    {currentLang === 'ar' ? t.nextQuestion : t.nextQuestion}
                                    {currentLang === 'ar' ? <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" /> : <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />}
                                </>
                            )
                            : (
                                <>
                                    {currentLang === 'ar' ? t.finishLevel : t.finishLevel}
                                    <Trophy className="w-6 h-6" />
                                </>
                            )
                        }
                    </button>
                )}
            </div>
        );
    };

    const renderGameOver = () => {
        if (!session) return null;

        return (
            <div className="p-6 max-w-2xl mx-auto text-center animate-fade-in flex flex-col items-center justify-center min-h-[60vh]">
                <div className="mb-8 relative">
                    <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full"></div>
                    <Heart className="w-32 h-32 text-red-500 animate-pulse relative z-10" />
                </div>

                <h2 className="text-4xl font-bold text-white mb-4">
                    {currentLang === 'ar' ? t.gameOverTitle : t.gameOverTitle}
                </h2>
                <p className="text-white/70 text-xl mb-12 max-w-md">
                    {currentLang === 'ar' ? t.gameOverMessage : t.gameOverMessage}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                    <button
                        onClick={() => startLevel(session.levelId)}
                        className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-white transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                        <RotateCcw className="w-5 h-5" />
                        {currentLang === 'ar' ? t.retry : t.retry}
                    </button>
                    <button
                        onClick={() => setGameState('menu')}
                        className="flex-1 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2"
                    >
                        <Home className="w-5 h-5" />
                        {currentLang === 'ar' ? t.mainMenu : t.mainMenu}
                    </button>
                </div>
            </div>
        );
    };

    const renderResults = () => {
        if (!session) return null;

        const level = allLevels.find(l => l.id === session.levelId);
        if (!level) return null;

        const scorePercentage = (session.score / session.questions.length) * 100;
        const passed = scorePercentage >= level.requiredScore;
        const stars = progress.levelStars[session.levelId] || 0;

        return (
            <div className="p-6 max-w-2xl mx-auto text-center animate-fade-in flex flex-col items-center justify-center min-h-[60vh]">
                <div className="mb-8 relative">
                    <div className={`absolute inset-0 blur-3xl rounded-full ${passed ? 'bg-yellow-500/20' : 'bg-red-500/20'}`}></div>
                    {passed ? <Trophy className="w-32 h-32 text-yellow-400 animate-bounce relative z-10" /> : <Heart className="w-32 h-32 text-white/20 relative z-10" />}
                </div>

                <h2 className="text-4xl font-bold text-white mb-2">
                    {passed
                        ? (currentLang === 'ar' ? t.wellDone : t.wellDone)
                        : (currentLang === 'ar' ? t.tryAgain : t.tryAgain)
                    }
                </h2>
                <p className="text-white/70 text-xl mb-8">
                    {currentLang === 'ar' ? level.titleAr : level.titleEn}
                </p>

                {/* Score */}
                <div className="bg-white/10 rounded-3xl p-8 mb-8 border border-white/10 backdrop-blur-sm w-full max-w-md">
                    <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4">
                        {scorePercentage.toFixed(0)}%
                    </div>
                    <div className="text-white/70 mb-6 text-lg">
                        {session.score} / {session.questions.length} {currentLang === 'ar' ? t.correctAnswers : t.correctAnswers}
                    </div>

                    {passed && (
                        <div className="flex items-center justify-center gap-4 mb-4">
                            {[1, 2, 3].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-12 h-12 transform transition-all duration-500 ${star <= stars ? 'text-yellow-400 fill-yellow-400 scale-110' : 'text-white/20 scale-100'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                    <button
                        onClick={() => startLevel(session.levelId)}
                        className="flex-1 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2"
                    >
                        <RotateCcw className="w-5 h-5" />
                        {currentLang === 'ar' ? t.retry : t.retry}
                    </button>
                    <button
                        onClick={() => setGameState('menu')}
                        className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2"
                    >
                        <Home className="w-5 h-5" />
                        {currentLang === 'ar' ? t.mainMenu : t.mainMenu}
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 to-slate-800 overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-sm border-b border-white/10 p-4">
                <div className="flex items-center justify-between max-w-6xl mx-auto">
                    <div className="flex items-center gap-2">
                        <Trophy className="w-6 h-6 text-indigo-400" />
                        <h1 className="text-xl font-bold text-white">
                            {currentLang === 'ar' ? 'فرسان الضاد' : 'Arabic Knights'}
                        </h1>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
                    >
                        <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto py-8">
                {gameState === 'menu' && renderMenu()}
                {gameState === 'playing' && renderGame()}
                {gameState === 'results' && renderResults()}
                {gameState === 'gameover' && renderGameOver()}
            </div>
        </div>
    );
};
