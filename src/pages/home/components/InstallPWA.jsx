import React, { useEffect, useState } from 'react';

function InstallPWA() {
    const [prompt, setPrompt] = useState(null);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setPrompt(e);
        };
        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = () => {
        if (prompt) {
            prompt.prompt();
            prompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                setPrompt(null);
            });
        }
    };

    return (
        <div>
            {prompt && (
                <button className="btn btn-primary" onClick={handleInstall}>
                    Install App
                </button>
            )}
        </div>
    );
}

export default InstallPWA;
