---
title: Simon Says Microcontroller Game
description: An embedded implementation of the Simon memory game, from QUT's Microprocessors and Digital Systems unit.
category: university
status: "Completed"
thumbnail: /assets/img/simon-says-microcontroller-game/quty-board-photo.webp
skills:
  - Embedded C
  - Microcontrollers
  - PlatformIO
  - State Machines
---

## Project overview

An individual, bare-metal assignment: implement the classic "Simon" memory game from scratch on a microcontroller dev board (QUT's in-house "QUTy" board, built around an ATtiny1626), driving a 7-segment display and buzzer from four pushbuttons, with playback speed adjustable via a potentiometer. No Arduino-style libraries, no hardware abstraction layer, just the datasheet and the chip's own peripheral registers. The project is complete and working on real hardware.

## System architecture

The firmware is a set of small hardware driver modules (buttons, buzzer, ADC, SPI, UART, timers, sequence generator), each one only exposing what the game logic actually needs (read a button, play a tone, light a segment), so register-level details stay out of the game rules entirely. The game itself runs as a state machine on top of those drivers.

<figure>
  <a class="lightbox-trigger" href="{{ "/assets/img/simon-says-microcontroller-game/quty-schematic.png" | relative_url }}">
    <img src="{{ "/assets/img/simon-says-microcontroller-game/quty-schematic.png" | relative_url }}" alt="Schematic of the QUTy development board used for this project">
  </a>
  <figcaption>QUTy development board schematic (QUT's own board design, not mine, the hardware this firmware targets)</figcaption>
</figure>

## Selected engineering challenges and decisions

**Structuring the game as a state machine instead of a tangle of flags.** The whole game is one `switch` statement on a state variable inside the main loop: a few states for the machine's turn, a few for the human's turn, a few for the win/lose/high-score flow, ten in total. A second, smaller state machine runs in parallel for the UART serial interface, which accepts commands and a typed name independently of button presses. This mattered because it let the game rules be reasoned about as "what state am I in, what just happened, what state do I go to next," rather than as interacting boolean flags that get harder to reason about as the game grows.

**Managing real-time peripherals without blocking the main loop.** Two hardware timers are configured directly through their control registers at startup, each driving its own interrupt: one increments an elapsed-time counter every millisecond; the other, every 5ms, multiplexes the two 7-segment digits over a single SPI output fast enough that both look constantly lit, and runs a parallel debounce pass across all four buttons in the same interrupt, rather than debouncing each button with its own separate counter and timer. A third timer drives the buzzer via PWM, changing pitch by recalculating and reloading the timer's period register. The main loop never touches hardware timing directly, it just reads whatever the interrupts have already updated. This mattered because the alternative, polling everything from the main loop, doesn't scale to multiple time-sensitive jobs (display refresh, debounce, tone generation) running at different rates at once.

**Generating an unpredictable but reproducible sequence with no hardware RNG.** The growing pattern comes from a linear feedback shift register (LFSR): shifts and XORs only, no multiplication, division, or hardware random-number peripheral, so it sits comfortably within the chip's resources. Rather than storing the sequence as it's generated, the firmware recomputes the nth element from scratch each time it's needed, replaying the shift register forward from the seed for n steps, trading a few CPU cycles for a simpler state model: the whole "what comes next" collapses to just the seed and how far play has progressed, rather than a buffer that could drift out of sync. The seed itself is tied to my own student number, QUT's own anti-collusion mechanism, so two students' boards never play back the same sequence even running identical logic, and it increments on a loss so replaying the game doesn't repeat the same memorisable pattern.

## Verification or evidence

<figure>
  <a class="lightbox-trigger" href="{{ "/assets/img/simon-says-microcontroller-game/quty-board-photo.webp" | relative_url }}">
    <img src="{{ "/assets/img/simon-says-microcontroller-game/quty-board-photo.webp" | relative_url }}" alt="The QUTy board running the Simon Says game, 7-segment display lit up">
  </a>
  <figcaption>The QUTy board running the game on real hardware</figcaption>
</figure>

## Current status

**Completed:** a working implementation of the full game loop, an increasingly long sequence of lights and tones the player has to reproduce, with game-over and high-score logic, running on the real board. This was a closed university assessment; no further development is planned.

## What I learned or am proud of

I built this before AI-assisted code generation was really a thing, so every register setting, interrupt, and state transition came from reading the datasheet and working it out by hand rather than from a prompt. That's where a lot of my actual feel for how microcontrollers behave came from, and it's still what I lean on now to judge whether AI-generated embedded code is doing something sensible.
