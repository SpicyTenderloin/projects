---
title: Signal Pre-Conditioning Circuit
description: An analog front-end for a microphone-based digital voice recorder, from QUT's Electronic Design unit.
category: university
thumbnail: /assets/img/signal-preconditioning-circuit/breadboard-prototype.jpg
skills:
  - LTspice
  - MATLAB
  - Analog Circuit Design
  - Op-Amp Design
  - Filter Design
---

**Task:** design the analog front-end for a digital voice recorder built around a microcontroller's analog-to-digital converter (ADC). A microphone signal needed to be conditioned, centred, filtered, and amplified so it would make full use of the ADC's input range without clipping or aliasing, while preserving the frequency range that matters most for speech intelligibility.

**Approach:** the design cascades four op-amp stages: a microphone interface stage, a buffer/pre-amplifier, a multi-stage anti-aliasing filter, and a final amplification stage. Component values for each stage were calculated using custom MATLAB scripts, then verified in LTspice simulation before being built and tested on a breadboard. Bench measurements (bode plots and live transient captures) were compared back against the simulated predictions at every stage to validate the design.

<figure>
  <a class="lightbox-trigger" href="{{ "/assets/img/signal-preconditioning-circuit/breadboard-prototype.jpg" | relative_url }}">
    <img src="{{ "/assets/img/signal-preconditioning-circuit/breadboard-prototype.jpg" | relative_url }}" alt="Breadboard prototype of the signal pre-conditioning circuit">
  </a>
  <figcaption>Breadboard prototype of the signal pre-conditioning circuit</figcaption>
</figure>

**Outcome:** the simulated frequency response confirmed the cascaded stages met the passband and attenuation targets needed to avoid aliasing while keeping the speech-critical frequency range intact. On the bench, measured bode plots closely tracked the simulated response, and a live capture of the circuit's output while speaking into the microphone showed the signal properly centred and using most of the ADC's input range, exactly as designed.

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
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/signal-preconditioning-circuit/scope-voice-signal.png" | relative_url }}">
      <img src="{{ "/assets/img/signal-preconditioning-circuit/scope-voice-signal.png" | relative_url }}" alt="Oscilloscope capture of the conditioned signal while speaking into the microphone">
    </a>
    <figcaption>Conditioned signal on the oscilloscope while speaking into the microphone</figcaption>
  </figure>
</div>
