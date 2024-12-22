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
        <div className='fixed flex justify-between items-center top-2 z-50 w-[98vw] mx-auto bg-warning/60 outline-yellow-500 backdrop-blur-md p-2 rounded-lg'>
            <image src="/icon-192.png" alt="Logo" className="w-10 h-10 rounded-full" />
            {prompt && (
                <button className="btn btn-warning btn-outline-warning" onClick={handleInstall}>
                    Install
                </button>
            )}
        </div>
    );
}

export default InstallPWA;
