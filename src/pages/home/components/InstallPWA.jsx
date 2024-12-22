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
                <div className="w-full sm:max-w-[560px] ">
                    <div className="flex justify-center items-center align-middle bg-warning p-3">
                        <span>Now, App is avilable!</span>
                        <div className="flex gap-2 mx-2">
                            <span className="btn btn-xs" onClick={() => handleInstallLater()}>
                                Later
                            </span>
                            <span className="btn btn-xs" onClick={() => handleInstall()}>
                                Install
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default InstallPWA;
