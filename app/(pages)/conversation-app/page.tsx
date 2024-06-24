'use client'
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import RecordMessage from "./ConversationModel/Recorder/RecordMessage";
import RenderMessages from "./ConversationModel/RenderMessages";
import Title from "./ConversationModel/Title";
import { appConfig } from "@/app/components/baseComponents/utils/helpers";
import CategoryType from "../dashboard/categories/AutoModel/types";
import SubCategoryType from "../dashboard/categories/[categoryId]/sub-categories/AutoModel/types";
import { MessageType } from "./ConversationModel/types";

const Page = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<CategoryType | undefined>();
    const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategoryType | undefined>();
    const [uploadFailed, setUploadFailed] = useState<boolean>(false);
    const [hasDoneAnyRecording, setHasDoneAnyRecording] = useState(false); // State to track if user has done any recording

    const conversationsContainer = useRef<HTMLDivElement>(null);

    const handleStop = async (blobUrl: string) => {
        setIsLoading(true);

        if (!selectedCategory?.id) return

        try {
            // Convert blob url to blob object
            const blob = await fetch(blobUrl).then((b) => b.blob());

            // Construct form data to send file
            const formData = new FormData();
            formData.append('file', blob, `my_speech_for_${selectedCategory.id}.wav`);

            // Send form data to the FastAPI backend
            const resp = await axios.post(appConfig.api.url(`/post-audio?sub_cat_id=${selectedSubCategory.id}`), formData, {
                headers: {
                    'Content-Type': 'audio/mpeg',
                },
                responseType: 'json',
            });

            if (resp.status === 200) {
                const responseData = resp.data;
                const myMessage: MessageType = { ...responseData[0], audio: blobUrl };
                setMessages(prevMessages => [...prevMessages, myMessage]);

                // Fetch the assistant's audio
                const assistantAudioResponse = await axios.get(appConfig.api.url(`${responseData[1]['audio_uri']}`), {
                    responseType: 'blob',
                });

                if (assistantAudioResponse.status === 200) {
                    const assistantAudioBlob = assistantAudioResponse.data;
                    const assistantAudioUrl = window.URL.createObjectURL(assistantAudioBlob);
                    const assistantMessage: MessageType = { ...responseData[1], audio: assistantAudioUrl };
                    setMessages(prevMessages => [...prevMessages, assistantMessage]);
                    setUploadFailed(false)
                    setHasDoneAnyRecording(true)

                } else {
                    setUploadFailed(true)
                    console.error('Error fetching assistant audio.');
                }
            } else {
                setUploadFailed(true)
                console.error('Error posting audio.');
            }
        } catch (error) {
            setUploadFailed(true)
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const scrollToBottom = () => {
        if (conversationsContainer.current) {
            conversationsContainer.current.scrollTo({
                top: conversationsContainer.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="relative">
            <div className="flex-grow">
                <Title setMessages={setMessages} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} selectedSubCategory={selectedSubCategory} setSelectedSubCategory={setSelectedSubCategory} />
                <div ref={conversationsContainer} className="overflow-auto pb-56 bg-base-200 p-4" style={{ height: 'calc(100vh - 13rem)' }}>
                    {
                        selectedSubCategory &&
                        <p className="text-center my-3 text-lg border-base-300 border-b-2 px-2 text-success">{selectedSubCategory.learn_instructions}</p>
                    }
                    <RenderMessages messages={messages} isLoading={isLoading} hasDoneAnyRecording={hasDoneAnyRecording} />
                </div>
            </div>
            <div className="relative">
                <div className="absolute w-full bottom-0 left-0 z-50">
                    <RecordMessage handleStop={handleStop} isLoading={isLoading} uploadFailed={uploadFailed} />
                </div>
            </div>
        </div>
    );
};

export default Page;
