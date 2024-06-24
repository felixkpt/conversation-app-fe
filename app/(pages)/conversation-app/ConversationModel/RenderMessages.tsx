import { appConfig } from '@/app/components/baseComponents/utils/helpers';
import React, { useEffect, useRef, useState } from 'react';
import TimeAgo from 'react-timeago';
import { MessageType } from './types';

type Props = {
    messages: MessageType[];
    isLoading: boolean;
    hasDoneAnyRecording: boolean;

};

const RenderMessages = ({ messages = [], isLoading, hasDoneAnyRecording }: Props) => {
    const messagesRef = useRef<HTMLDivElement>(null); // Ref for the messages container
    const [userInteracted, setUserInteracted] = useState(false); // State to track user interaction

    useEffect(() => {
        const handleUserInteraction = () => {
            setUserInteracted(true);
            window.removeEventListener('click', handleUserInteraction);
            window.removeEventListener('keydown', handleUserInteraction);
        };

        window.addEventListener('click', handleUserInteraction);
        window.addEventListener('keydown', handleUserInteraction);

        return () => {
            window.removeEventListener('click', handleUserInteraction);
            window.removeEventListener('keydown', handleUserInteraction);
        };
    }, []);

    useEffect(() => {
        const playLastAudio = () => {

            if (messagesRef.current && userInteracted && hasDoneAnyRecording && !isLoading) {
                const audioElements = messagesRef.current.querySelectorAll('.singleConversationSection audio');
                audioElements.forEach((itm) => {
                    const audio = itm as HTMLAudioElement;
                    audio.pause();
                    audio.currentTime = 0;
                });

                setTimeout(() => {
                    if (audioElements.length > 0) {
                        const lastAudio = audioElements[audioElements.length - 1];
                        if (lastAudio instanceof HTMLAudioElement) {
                            lastAudio.play().catch((error: any) => console.error('Audio playback error:', error));
                        }
                    }
                }, 1000);
            }
        };

        setTimeout(() => {
            playLastAudio();
        }, 300);

    }, [messages, userInteracted, hasDoneAnyRecording, isLoading]); // Run this effect whenever messages array, userInteracted, hasDoneAnyRecording, or isLoading changes

    return (
        <div className="flex flex-col" ref={messagesRef}>
            {messages.length === 0 ? (
                <div className="text-center text-neutral">
                    <p>No messages yet. Start recording to send a message!</p>
                </div>
            ) : (
                messages.map((message, index) => (
                    <div
                        key={index}
                        className={
                            'singleConversationSection mb-4 flex flex-col ' +
                            (message.role === 'user' ? 'items-end' : 'items-start')
                        }
                        data-role={message.role}
                    >
                        <div className="bg-base-300 w-3/4 rounded-xl p-3">
                            <span className={"font-semibold flex gap-1 items-center uppercase " + (message.role === 'user' ? 'justify-end' : 'justify-start')}>
                                {
                                    message.role == 'user' ?
                                        <span className="flex items-center gap-1">
                                            <div>
                                            </div>
                                            <div className="avatar online placeholder">
                                                <div className="bg-neutral text-neutral-content rounded-full w-16">
                                                    <span className="text-normal">You</span>
                                                </div>
                                            </div>
                                        </span>
                                        :
                                        <span className="flex items-center gap-1">
                                            <div className="avatar online placeholder">
                                                <div className="bg-neutral text-neutral-content rounded-full w-16">
                                                    <span className="text-normal">AI</span>
                                                </div>
                                            </div>
                                            <div>
                                            </div>
                                        </span>
                                }

                            </span>
                            {message.content && <p className="mt-2">{message.content}</p>}
                            <div className="audioSection">
                                {message.audio ? (
                                    <audio src={message.audio} controls className="mt-2 w-full" />
                                ) : message.audio_uri ? (
                                    <audio
                                        src={appConfig.api.url(`${message.audio_uri}`)}
                                        controls
                                        className="mt-2 w-full"
                                    />
                                ) : null}
                            </div>
                            <div className="flex justify-end">
                                <span className="rounded p-1 text-gray-400 text-sm">
                                    <TimeAgo date={message.created_at} />
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            )}
            {isLoading && (
                <div className="text-center my-4 animate-pulse cursor-default select-none">
                    <p>Gimmie a few seconds...</p>
                </div>
            )}
        </div>
    );
};

export default RenderMessages;
