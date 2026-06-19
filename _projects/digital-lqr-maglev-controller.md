---
title: Digital LQR Maglev Controller
description: Digital control system design for a magnetic levitation module, from QUT's Modern Control unit.
category: university
thumbnail: /assets/img/digital-lqr-maglev-controller/step-response.jpg
skills:
  - MATLAB
  - Simulink
  - Control Systems
  - State-Space Modelling
  - Kalman Filtering
---

**Task:** design a digital control system to hold a magnetic levitation (maglev) module at a stable height. The system is open-loop unstable and strongly nonlinear, so it has to be actively controlled at all times to stop the levitating carriage from dropping onto the track.

**Approach:** modelled the system's nonlinear dynamics from first principles and linearised them around a practical operating point, then designed a discrete-time full-state feedback controller with integral action to meet a fast, low-overshoot response specification. Since the real system can only measure position, a Kalman filter observer was designed to estimate the remaining states (velocity and coil current) from that single measurement. The full design was validated in Simulink against a realistic nonlinear plant model with sensor noise, process noise, and disturbances included.

<figure>
  <a class="lightbox-trigger" href="{{ "/assets/img/digital-lqr-maglev-controller/simulink-model.jpg" | relative_url }}">
    <img src="{{ "/assets/img/digital-lqr-maglev-controller/simulink-model.jpg" | relative_url }}" alt="Simulink model of the maglev system used for validation">
  </a>
  <figcaption>Simulink model of the maglev system used for validation</figcaption>
</figure>

**Outcome:** the controller settled in under two seconds with about 2% overshoot, tracked reference heights well beyond the nominal operating point, and successfully rejected a large disturbance impulse without the carriage contacting the track. The observer tracked the true system states closely even with noise present, confirming the design was viable for an embedded implementation.

<div class="gallery">
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/digital-lqr-maglev-controller/step-response.jpg" | relative_url }}">
      <img src="{{ "/assets/img/digital-lqr-maglev-controller/step-response.jpg" | relative_url }}" alt="Closed-loop step response, position and velocity">
    </a>
    <figcaption>Closed-loop step response, position and velocity</figcaption>
  </figure>
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/digital-lqr-maglev-controller/kalman-filter-performance.jpg" | relative_url }}">
      <img src="{{ "/assets/img/digital-lqr-maglev-controller/kalman-filter-performance.jpg" | relative_url }}" alt="Kalman filter observer tracking the true plant states">
    </a>
    <figcaption>Kalman filter observer tracking the true plant states</figcaption>
  </figure>
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/digital-lqr-maglev-controller/perturbation-response.jpg" | relative_url }}">
      <img src="{{ "/assets/img/digital-lqr-maglev-controller/perturbation-response.jpg" | relative_url }}" alt="Controller response to a large disturbance impulse">
    </a>
    <figcaption>Controller response to a large disturbance impulse</figcaption>
  </figure>
</div>
