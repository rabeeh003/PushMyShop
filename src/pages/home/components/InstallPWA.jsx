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
                setPrompt(null); // Hide the prompt after user interaction
            });
        }
    };

    const handleInstallLater = () => {
        console.log('User chose to install later');
        setPrompt(null); // Dismiss the prompt
    };

    return (
        <>
            {prompt && (
                <div className="absolute w-full top-2 z-50 sm:max-w-[560px] ">
                    <div className="flex justify-between items-center align-middle mx-3 bg-warning/60 outline-yellow-500 backdrop-blur-md p-3 rounded-lg">
                        <img
                            src="/icon-192.png"
                            alt="Logo"
                            className="w-12 h-12 border-2 border-white rounded-full"
                        />
                        <div className="flex gap-2">
                            <button className="btn btn-outline-warning" onClick={handleInstallLater}>
                                Later
                            </button>
                            <button className="btn btn-outline-warning border-white text-white " onClick={handleInstall}>
                                Install
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default InstallPWA;
