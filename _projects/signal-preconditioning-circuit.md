---
title: Signal Pre-Conditioning Circuit
description: An analog front-end for a microphone-based digital voice recorder, from QUT's Electronic Design unit.
category: university
status: "Completed"
thumbnail: /assets/img/signal-preconditioning-circuit/breadboard-prototype.jpg
skills:
  - LTspice
  - MATLAB
  - Analog Circuit Design
  - Op-Amp Design
  - Filter Design
---

## Project overview

An individual assignment: design the analog front-end for a digital voice recorder built around a microcontroller's analog-to-digital converter (ADC). A microphone signal needed to be conditioned, centred, filtered, and amplified to make full use of the ADC's input range without clipping or aliasing, while preserving the frequency range that matters most for speech intelligibility. The project is complete, simulated, built, and verified on real hardware.

## System architecture

The design cascades four op-amp stages: a microphone interface stage, a buffer/pre-amplifier, a multi-stage anti-aliasing filter, and a final amplification stage. Component values for each stage were calculated using custom MATLAB scripts, then verified in LTspice simulation before being built and tested on a breadboard.

<figure>
  <a class="lightbox-trigger" href="{{ "/assets/img/signal-preconditioning-circuit/schematic.png" | relative_url }}">
    <img src="{{ "/assets/img/signal-preconditioning-circuit/schematic.png" | relative_url }}" alt="Full circuit schematic, broken into its four cascaded op-amp stages">
  </a>
  <figcaption>Full schematic, broken into its four cascaded op-amp stages</figcaption>
</figure>

<figure>
  <a class="lightbox-trigger" href="{{ "/assets/img/signal-preconditioning-circuit/breadboard-prototype.jpg" | relative_url }}">
    <img src="{{ "/assets/img/signal-preconditioning-circuit/breadboard-prototype.jpg" | relative_url }}" alt="Breadboard prototype of the signal pre-conditioning circuit">
  </a>
  <figcaption>Breadboard prototype</figcaption>
</figure>

## Selected engineering challenges and decisions

**Tracking down power-supply noise before it corrupted the signal.** A decoupling capacitor was added close to the op-amp's supply pins to deal with noise picked up through the power leads. This mattered because an analog front-end is only as clean as the supply rail feeding it, noise on the power pins shows up directly in the signal being so carefully conditioned, so it's not a separate concern from the filter design itself. The before/after comparison below shows just how much cleaner the supply rail is with the capacitor in place.

<div class="gallery">
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/signal-preconditioning-circuit/scope-no-decoupling.png" | relative_url }}">
      <img src="{{ "/assets/img/signal-preconditioning-circuit/scope-no-decoupling.png" | relative_url }}" alt="Power supply noise without a decoupling capacitor">
    </a>
    <figcaption>Power supply noise without a decoupling capacitor</figcaption>
  </figure>
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/signal-preconditioning-circuit/scope-with-decoupling.png" | relative_url }}">
      <img src="{{ "/assets/img/signal-preconditioning-circuit/scope-with-decoupling.png" | relative_url }}" alt="Power supply noise with a decoupling capacitor added">
    </a>
    <figcaption>The same supply rail with a decoupling capacitor added</figcaption>
  </figure>
</div>

## Verification or evidence

The simulated frequency response confirmed the cascaded stages met the passband and attenuation targets needed to avoid aliasing while keeping the speech-critical frequency range intact, and measured bode plots on the bench closely tracked the simulated response:

<div class="gallery">
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/signal-preconditioning-circuit/sim-frequency-response.png" | relative_url }}">
      <img src="{{ "/assets/img/signal-preconditioning-circuit/sim-frequency-response.png" | relative_url }}" alt="Simulated frequency response of the full cascaded circuit">
    </a>
    <figcaption>Simulated frequency response of the full cascaded circuit</figcaption>
  </figure>
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/signal-preconditioning-circuit/scope-bode-plot.png" | relative_url }}">
      <img src="{{ "/assets/img/signal-preconditioning-circuit/scope-bode-plot.png" | relative_url }}" alt="Measured bode plot of a filter stage on the bench">
    </a>
    <figcaption>Measured bode plot of a filter stage on the bench</figcaption>
  </figure>
</div>

A live capture of the circuit's output while speaking into the microphone showed the signal properly centred and using most of the ADC's input range, exactly as designed.

<figure>
  <a class="lightbox-trigger" href="{{ "/assets/img/signal-preconditioning-circuit/scope-voice-signal.png" | relative_url }}">
    <img src="{{ "/assets/img/signal-preconditioning-circuit/scope-voice-signal.png" | relative_url }}" alt="Oscilloscope capture of the conditioned signal while speaking into the microphone">
  </a>
  <figcaption>Conditioned signal on the oscilloscope while speaking into the microphone</figcaption>
</figure>

## Current status

**Completed:** simulated and measured results matched closely across every check, on real hardware, including a live working capture of an actual voice signal. This was a closed university assessment; no further development is planned.

## What I learned or am proud of

Chasing the power-supply noise down to a missing decoupling capacitor is the part I'd point to first: it's a reminder that signal integrity and power integrity aren't separate problems in an analog design, a clean filter stage built on a noisy supply rail is still a noisy circuit. I check supply decoupling early now, rather than only after a clean signal somehow comes out noisy.
