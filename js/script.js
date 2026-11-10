"use strict";

// Обертка для безопасного выполнения после полной загрузки HTML
document.addEventListener("DOMContentLoaded", () => {
    
    // Получение элементов из DOM
    const delayButton = document.querySelector("#delay-button");
    const delayedText = document.querySelector("#delayed-text");
    const startButton = document.querySelector("#start-button");
    const pauseButton = document.querySelector("#pause-button");
    const resetButton = document.querySelector("#reset-button");
    const secondsText = document.querySelector("#seconds");
    const status = document.querySelector("#status");

    // Состояния таймеров
    let seconds = 10;
    let timeoutId = null;
    let intervalId = null;

    // Проверка: если вдруг какого-то элемента нет на странице, выходим, чтобы не вызвать ошибку
    if (!delayButton || !delayedText || !startButton || !pauseButton || !resetButton || !secondsText || !status) {
        console.warn("Предупреждение: Не все элементы найдены на странице. Проверьте ID в HTML.");
        return;
    }

    // === 1. Отложенное сообщение ===
    delayButton.addEventListener("click", () => {
        clearTimeout(timeoutId);
        delayedText.textContent = "Ожидаем сообщение...";
        
        timeoutId = setTimeout(() => {
            delayedText.textContent = "Сообщение появилось!";
        }, 2000);
    });

    // === 2. Старт обратного отсчёта ===
    startButton.addEventListener("click", () => {
        // Защита от создания дублирующих интервалов при повторном клике
        if (intervalId !== null) {
            return;
        }

        status.textContent = "Таймер запущен...";

        intervalId = setInterval(() => {
            seconds--;
            secondsText.textContent = seconds;

            if (seconds === 0) {
                clearInterval(intervalId);
                intervalId = null;
                status.textContent = "Время вышло!";
            }
        }, 1000);
    });

    // === 3. Пауза ===
    pauseButton.addEventListener("click", () => {
        if (intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
            status.textContent = "Таймер на паузе.";
        }
    });

    // === 4. Сброс ===
    resetButton.addEventListener("click", () => {
        // Сброс таймаута
        clearTimeout(timeoutId);
        timeoutId = null;
        delayedText.textContent = "Сообщение ещё не запланировано";

        // Сброс интервала
        clearInterval(intervalId);
        intervalId = null;
        
        // Сброс значений к исходным из HTML
        seconds = 10;
        secondsText.textContent = seconds;
        status.textContent = "Таймер готов к запуску.";
    });
});
