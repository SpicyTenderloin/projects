---
title: OFDM System Design
description: Team-designed and simulated OFDM communications system, from QUT's Advanced Telecommunications unit.
category: university
thumbnail: /assets/img/ofdm-system-design/qam-constellation.jpg
skills:
  - MATLAB
  - Telecommunications
  - OFDM
  - Channel Modelling
  - Error Correction Coding
---

**Task:** as part of a small team, design an OFDM (Orthogonal Frequency Division Multiplexing) system to a given set of parameters, then evaluate its performance under realistic wireless channel conditions including multipath fading and noise.

**Approach:** worked through the system's link-level parameters (subcarrier spacing, symbol duration, guard interval, bandwidth) before simulating the system end to end in MATLAB. This included modelling AWGN and Rayleigh fading channels, characterising a multipath channel's power delay profile to check the guard interval was actually long enough to absorb it, measuring bit-error-rate (BER) performance against theoretical curves to validate the simulation, and adding forward error correction (LDPC coding) to recover performance lost to fading.

<figure>
  <a class="lightbox-trigger" href="{{ "/assets/img/ofdm-system-design/channel-power-delay-profile.png" | relative_url }}">
    <img src="{{ "/assets/img/ofdm-system-design/channel-power-delay-profile.png" | relative_url }}" alt="Power delay profile of the multipath channel used for simulation, compared against the guard interval length">
  </a>
  <figcaption>Power delay profile of the multipath channel, plotted against the guard interval to confirm it was long enough to absorb the delay spread</figcaption>
</figure>

**Outcome:** the simulated BER closely tracked theoretical predictions for both AWGN and fading channels, validating the model. Multipath fading clearly degraded raw performance compared to AWGN, but adding LDPC coding recovered a large part of that gap, visibly pulling the coded curve back up toward the AWGN baseline rather than sitting on the uncoded fading curve. The constellation plots below show the same story visually: a received 64-QAM signal is badly scattered by fading and noise, then pulled back into clean, separable clusters once channel equalisation is applied.

<div class="gallery">
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/ofdm-system-design/qam-constellation.jpg" | relative_url }}">
      <img src="{{ "/assets/img/ofdm-system-design/qam-constellation.jpg" | relative_url }}" alt="64-QAM constellation before and after channel equalisation">
    </a>
    <figcaption>64-QAM constellation before and after channel equalisation</figcaption>
  </figure>
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/ofdm-system-design/ber-awgn-vs-fading.png" | relative_url }}">
      <img src="{{ "/assets/img/ofdm-system-design/ber-awgn-vs-fading.png" | relative_url }}" alt="Simulated vs theoretical bit-error-rate for AWGN and fading channels">
    </a>
    <figcaption>Simulated vs theoretical bit-error-rate for AWGN and fading channels</figcaption>
  </figure>
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/ofdm-system-design/ber-with-ldpc.png" | relative_url }}">
      <img src="{{ "/assets/img/ofdm-system-design/ber-with-ldpc.png" | relative_url }}" alt="Bit-error-rate improvement after adding LDPC forward error correction">
    </a>
    <figcaption>Bit-error-rate improvement after adding LDPC forward error correction</figcaption>
  </figure>
</div>
