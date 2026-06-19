---
title: Super Heterodyne Receiver
description: Team-designed conceptual RF receiver covering a 3 to 5 GHz band, from QUT's Telecommunications and RF unit.
category: university
thumbnail: /assets/img/super-heterodyne-receiver/architecture-diagram.png
skills:
  - RF Design
  - MATLAB
  - Link Budget Analysis
  - Mixer Design
---

**Task:** as part of a small team, design a super-heterodyne RF receiver covering 3 to 5 GHz against a client-style specification: defined channel bandwidth, image and spurious signal rejection, sensitivity, and signal-to-noise ratio.

**Approach:** the design uses a two-stage down-conversion architecture, mixing the incoming signal down to an intermediate frequency in two steps to balance image rejection against selectivity. The full 3 to 5 GHz band is split into four channels, each with its own preselection filter switched in ahead of the first mixer. I focused on the conceptual design and the MATLAB-based verification work, modelling the mixer's output spectrum for every channel across the local oscillator's tuning range to check unwanted spurious products always stayed clear of the intermediate frequency, and confirming the design against the link budget (sensitivity, dynamic range, and SNR) using hand calculations cross-checked in MATLAB.

<figure>
  <a class="lightbox-trigger" href="{{ "/assets/img/super-heterodyne-receiver/architecture-diagram.png" | relative_url }}">
    <img src="{{ "/assets/img/super-heterodyne-receiver/architecture-diagram.png" | relative_url }}" alt="Super-heterodyne receiver architecture: filter bank, two mixer stages, local oscillators, and IF filters">
  </a>
  <figcaption>Super-heterodyne receiver architecture: filter bank, two mixer stages, local oscillators, and IF filters</figcaption>
</figure>

**Outcome:** the verified design met every target in the specification: a minimum discernible signal of -98 dBm, output SNR well above the 3 dB demodulator requirement across the full input power range, and a dynamic range of close to 40 dB. The spurious-response analysis below confirms the unwanted mixer products stay clear of the intermediate frequency at both ends of the lowest channel's local oscillator tuning range, and the same held across the other three channels right up to the top of the band.

<div class="gallery">
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/super-heterodyne-receiver/spurs-channel1-max.jpg" | relative_url }}">
      <img src="{{ "/assets/img/super-heterodyne-receiver/spurs-channel1-max.jpg" | relative_url }}" alt="Mixer output spurious products with the local oscillator at its maximum value">
    </a>
    <figcaption>Mixer output spurious products with the local oscillator at its maximum value</figcaption>
  </figure>
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/super-heterodyne-receiver/spurs-channel1-min.jpg" | relative_url }}">
      <img src="{{ "/assets/img/super-heterodyne-receiver/spurs-channel1-min.jpg" | relative_url }}" alt="Mixer output spurious products with the local oscillator at its minimum value">
    </a>
    <figcaption>Mixer output spurious products with the local oscillator at its minimum value</figcaption>
  </figure>
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/super-heterodyne-receiver/spurs-channel4-max.jpg" | relative_url }}">
      <img src="{{ "/assets/img/super-heterodyne-receiver/spurs-channel4-max.jpg" | relative_url }}" alt="Mixer output spurious products for the top channel, with the local oscillator at its maximum value">
    </a>
    <figcaption>Same analysis repeated for the top channel of the band</figcaption>
  </figure>
</div>
