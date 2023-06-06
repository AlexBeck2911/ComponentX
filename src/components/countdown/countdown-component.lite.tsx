import {onMount, useStore, useStyle} from "@builder.io/mitosis";

export default function CountdownComponent(props: any) {
    const state = useStore({
        timerId: null as NodeJS.Timer | null,
        startTime: 0,
        currentTime: 0,
        formatTime(time: number) {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            return `${this.padDigits(minutes)}:${this.padDigits(seconds)}`;
        },
        padDigits(number: number) {
            return number.toString().padStart(2, "0");
        },
        start() {
            if (!state.timerId) {
                if (state.currentTime === 0) {
                    state.currentTime = state.startTime;
                }

                state.timerId = setInterval(() => {
                    state.currentTime = state.currentTime - 1;

                    if (state.currentTime === 0) {
                        this.stop();
                        alert("Der Countdown ist abgelaufen!");
                    }
                }, 1000);
            }
        },
        stop() {
            if(state.timerId) {
                clearInterval(state.timerId);
                state.timerId = null;
            }
        },
        reset() {
            state.stop();
            state.currentTime = state.startTime;
        }
    });

    onMount(() => {
        state.startTime = props.startTimeCountdown;
        state.currentTime = state.startTime;
    })

    useStyle(`
    #timeDisplay{
        font-size: 45px;
    }  
    .timeDisplayContainer {
        margin-top: 40px;
        margin-bottom: 40px;
    }
  `);

    return (
        <div>
            <div class="align-items-center d-flex justify-content-center timeDisplayContainer">
                <span id="timeDisplay">{state.formatTime(state.currentTime)}</span>
            </div>
            <div>
                <button class="btn btn-success" onClick={() => state.start()}>Start</button>
                <button class="btn btn-warning" onClick={() => state.reset()}>Reset</button>
                <button class="btn btn-danger" onClick={() => state.stop()}>Stop</button>
            </div>
        </div>
    );
}
