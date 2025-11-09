import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [catAction, setCatAction] = useState<string>('idle');
  const [score, setScore] = useState<number>(0);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [gameActive, setGameActive] = useState<boolean>(false);
  const { toast } = useToast();

  const catImage = 'https://cdn.poehali.dev/projects/507e6a04-1853-45d6-9039-c96da08b1dbd/files/ca5d85ba-3c04-4305-8646-05e67d3e052f.jpg';

  const playSound = (action: string) => {
    const sounds: Record<string, string> = {
      jump: '🎵',
      dance: '🎶',
      shoot: '💥',
      sleep: '💤',
      click: '✨'
    };
    
    toast({
      description: `${sounds[action] || '✨'} ${action}!`,
      duration: 1000
    });
  };

  const handleAction = (action: string) => {
    setCatAction(action);
    playSound(action);
    
    setTimeout(() => {
      setCatAction('idle');
    }, 1500);
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    const interval = setInterval(() => {
      setMousePosition({
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20
      });
    }, 1500);

    setTimeout(() => {
      clearInterval(interval);
      setGameActive(false);
      toast({
        title: '🎮 Игра окончена!',
        description: `Ты поймал ${score} мышек!`,
        duration: 3000
      });
    }, 15000);
  };

  const catchMouse = () => {
    if (gameActive) {
      setScore(score + 1);
      playSound('click');
      setMousePosition({
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20
      });
    }
  };

  const getAnimationClass = () => {
    switch (catAction) {
      case 'jump':
        return 'animate-jump';
      case 'dance':
        return 'animate-wiggle';
      case 'shoot':
        return 'animate-shake';
      case 'sleep':
        return 'opacity-60';
      default:
        return 'animate-float';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-accent p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12 animate-bounce-in">
          <h1 className="text-6xl font-bold text-primary mb-4 drop-shadow-lg">
            🐱 Интерактивный Кот 🔫
          </h1>
          <p className="text-2xl text-foreground/80 font-medium">
            Самый весёлый персонаж в интернете!
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-primary/20">
            <h2 className="text-3xl font-bold mb-6 text-center text-primary flex items-center justify-center gap-2">
              <Icon name="Sparkles" size={32} />
              Анимации
            </h2>
            
            <div className="relative mb-8 flex justify-center items-center min-h-[400px]">
              <div className={`transition-all duration-300 ${getAnimationClass()}`}>
                <img 
                  src={catImage} 
                  alt="Animated Cat"
                  className="w-80 h-80 object-contain drop-shadow-2xl cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => handleAction('dance')}
                />
              </div>
              
              {catAction === 'shoot' && (
                <div className="absolute top-1/2 right-10 animate-pulse-ring">
                  <div className="text-6xl">💥</div>
                </div>
              )}
              
              {catAction === 'sleep' && (
                <div className="absolute top-20 right-20 animate-float">
                  <div className="text-4xl">💤</div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                size="lg"
                onClick={() => handleAction('jump')}
                className="text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <Icon name="ArrowUp" className="mr-2" />
                Прыжок
              </Button>
              
              <Button
                size="lg"
                onClick={() => handleAction('dance')}
                className="text-lg font-semibold bg-secondary hover:bg-secondary/90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <Icon name="Music" className="mr-2" />
                Танец
              </Button>
              
              <Button
                size="lg"
                onClick={() => handleAction('shoot')}
                className="text-lg font-semibold bg-destructive hover:bg-destructive/90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <Icon name="Zap" className="mr-2" />
                Стрельба
              </Button>
              
              <Button
                size="lg"
                onClick={() => handleAction('sleep')}
                className="text-lg font-semibold bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <Icon name="Moon" className="mr-2" />
                Спать
              </Button>
            </div>
          </Card>

          <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-secondary/20">
            <h2 className="text-3xl font-bold mb-6 text-center text-secondary flex items-center justify-center gap-2">
              <Icon name="Gamepad2" size={32} />
              Поймай Мышку!
            </h2>
            
            <div className="relative bg-gradient-to-br from-muted to-accent/30 rounded-2xl h-[400px] mb-6 border-4 border-secondary/30 overflow-hidden">
              {!gameActive ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    size="lg"
                    onClick={startGame}
                    className="text-2xl font-bold py-8 px-12 bg-secondary hover:bg-secondary/90 shadow-2xl transform hover:scale-110 transition-all animate-bounce-in"
                  >
                    <Icon name="Play" className="mr-3" size={32} />
                    Начать игру!
                  </Button>
                </div>
              ) : (
                <>
                  <div 
                    className="absolute w-16 h-16 cursor-pointer transition-all duration-200 hover:scale-110"
                    style={{ 
                      left: `${mousePosition.x}%`, 
                      top: `${mousePosition.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={catchMouse}
                  >
                    <div className="text-5xl animate-bounce-in">🐭</div>
                  </div>
                  
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-secondary">
                    <p className="text-2xl font-bold text-secondary">
                      Счёт: {score}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl p-6 border-2 border-primary/20">
              <h3 className="text-xl font-bold mb-3 text-foreground flex items-center gap-2">
                <Icon name="Info" size={24} />
                Правила игры:
              </h3>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">🎯</span>
                  <span>Нажми "Начать игру" чтобы запустить</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">🐭</span>
                  <span>Кликай по мышке, чтобы поймать её</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">⏱️</span>
                  <span>У тебя есть 15 секунд!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">🏆</span>
                  <span>Набери максимум очков!</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>

        <Card className="mt-8 p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-accent/20 animate-bounce-in">
          <h2 className="text-3xl font-bold mb-6 text-center text-accent-foreground flex items-center justify-center gap-2">
            <Icon name="Heart" size={32} className="text-primary" />
            О персонаже
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-5xl mb-2">😸</div>
              <h3 className="text-xl font-bold text-foreground">Весёлый</h3>
              <p className="text-foreground/70">Всегда в хорошем настроении!</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl mb-2">🎮</div>
              <h3 className="text-xl font-bold text-foreground">Игривый</h3>
              <p className="text-foreground/70">Обожает играть с тобой!</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl mb-2">⚡</div>
              <h3 className="text-xl font-bold text-foreground">Быстрый</h3>
              <p className="text-foreground/70">Молниеносные реакции!</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
