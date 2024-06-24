import { useState, useRef, useCallback } from "react";
import RecordIcon from "./RecordIcon";
import { ReactMediaRecorder } from "react-media-recorder";
import Tooltip from "@/app/components/baseComponents/ToolTips/Tooltip";

type Props = { handleStop: (blobUrl: string) => void, isLoading: boolean, uploadFailed: boolean };

const RecordMessage = ({ handleStop, isLoading, uploadFailed }: Props) => {
  const startTimeRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Reference for the timer interval
  const stopButtonRef = useRef<() => void | null>(null); // Reference for the stop function
  const abortRef = useRef<boolean>(false); // Reference for the abort state
  const [recording, setRecording] = useState(false);
  
  const [duration, setDuration] = useState<number | null>(null);
  const maxDuration = 120

  // Function to start the timer
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setDuration((prevDuration) => (prevDuration ? prevDuration + 1 : 1));

      // auto submit audio if maxDuration is reached
      const elapsed = getDuration();
      if (stopButtonRef.current && elapsed && elapsed >= maxDuration) {
        stopButtonRef.current();
      }
    }, 1000);
  };

  // Function to stop the timer
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null; // Reset the timer reference
    }
  };

  const handleStartRecording = () => {
    startTimeRef.current = Date.now();
    setRecording(true);
    setDuration(null); // Reset duration when recording starts
    startTimer(); // Start the timer when recording starts
  };

  const [blobUrl, setBlobUrl] = useState<string>()

  const handleStopRecording = (blobUrl: string) => {
    setBlobUrl(blobUrl)
    setRecording(false);
    stopTimer(); // Stop the timer when recording stops

    if (abortRef.current) {
      abortRef.current = false;
      return;
    }

    const durationInSeconds = getDuration()
    if (durationInSeconds) {

      setDuration(durationInSeconds); // Update duration in state

      if (durationInSeconds < 3 || isNaN(durationInSeconds) || durationInSeconds > maxDuration) {
        return;
      }

      handleStop(blobUrl);
      startTimeRef.current = null; // Reset startTime
      setDuration(null); // Reset duration when recording stops
    }
  };

  const abortRecording = useCallback(() => {
    abortRef.current = true;
    if (stopButtonRef.current) {
      stopButtonRef.current();
    }
  }, []);

  function getDuration() {
    const startTime = startTimeRef.current;
    if (startTime) {
      const durationInSeconds = Math.round((Date.now() - startTime) / 1000); // Duration in seconds

      return durationInSeconds

    }
    return null
  }

  return (
    <div className='p-3 border-t text-center bg-gradient-to-r from-emerald-600 to-emerald-700'>
      <ReactMediaRecorder
        audio
        onStop={handleStopRecording}
        stopStreamsOnStop
        render={({ status, startRecording, stopRecording }) => {
          // Store the stopRecording function in the ref
          stopButtonRef.current = stopRecording;

          return (
            <div className="mt-2">
              {
                !isLoading ?
                  <>
                    <Tooltip text={`${recording ? 'Stop' : 'Start'} recording`}>
                      <button
                        onClick={recording ? stopRecording : () => {
                          startRecording();
                          handleStartRecording();
                        }}
                        className="bg-white hover:bg-slate-200 text-gray-800 rounded-full p-2"
                      >
                        <RecordIcon
                          classText={`transition-all duration-500 ease-in-out ${status === 'recording' ? 'animate-pulse text-red-900' : ''}`}
                        />
                      </button>
                    </Tooltip>
                    <p className={`mt-2 text-gray-800 font-bold ${status === 'recording' ? 'text-red-900' : ''}`}>
                      {String(status).toUpperCase()}
                    </p>
                    <div>
                      <p>
                        {
                          duration && <div className="text-emerald-300">{duration} secs</div>
                        }
                        {
                          recording &&
                          <div className="flex justify-center items-center gap-2">
                            <Tooltip text="Cancel">
                              <div className="" style={{ cursor: 'pointer' }} onClick={abortRecording}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                              </div>
                            </Tooltip>
                          </div>
                        }
                      </p>

                      {
                        duration !== null && !recording &&
                        <p className="text-red-800 mt-2">
                          {duration < 3 && "Audio message is too short or invalid."}
                          {duration > maxDuration && "Audio message is too long."}
                        </p>
                      }
                    </div>
                    {!recording && uploadFailed ?
                      <Tooltip text="Unknown error occurred">
                        <div className="text-red-800 cursor-default flex justify-center items-center gap-1">
                          <span>Unknown error,</span>
                          <Tooltip text="Click to retry uploading">
                            <span onClick={() => blobUrl && handleStop(blobUrl)} className="cursor-pointer">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                              </svg>
                            </span>
                          </Tooltip>
                        </div>
                      </Tooltip>
                      : null}
                  </>
                  :
                  <div className="flex justify-center items-center gap-2" role="status">
                    <Tooltip text="Uploading your recording...">
                      <div>
                        <svg aria-hidden="true" className="w-14 h-14  text-gray-200 animate-spin dark:text-gray-200 fill-gray-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </Tooltip>
                  </div>
              }
              <p>
                <span className="text-emerald-300 text-sm">Keep your message between 3 secs and {maxDuration} secs</span>
              </p>
            </div>
          );
        }}
      />
    </div>
  );
};

export default RecordMessage;
