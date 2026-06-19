---
title: Simon Says Microcontroller Game
description: An embedded implementation of the Simon memory game, from QUT's Microprocessors and Digital Systems unit.
category: university
skills:
  - Embedded C
  - Microcontrollers
  - PlatformIO
  - State Machines
---

**Task:** implement the classic "Simon" memory game from scratch on a microcontroller dev board (QUT's in-house "QUTy" board), driving a 7-segment display and buzzer from four pushbuttons, with the playback speed adjustable via a potentiometer.

**Approach:** wrote bare-metal embedded C firmware structured around clear hardware driver modules: ADC sampling for the potentiometer, button input handling, buzzer tone generation, a timer for game pacing, SPI for the display, UART for debug output, and a pseudo-random sequence generator for the growing pattern the player has to repeat. Game logic sat on top of these drivers as a state machine handling sequence playback, input matching, and scoring.

**Outcome:** a working implementation of the full game loop: an increasingly long sequence of lights and tones that the player has to reproduce, with the game over and high score logic to match. No photos or video of the running board are on hand for this one yet, that would be a good addition if a build is still around to capture.
