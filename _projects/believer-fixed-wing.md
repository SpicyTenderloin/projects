---
title: Believer Fixed Wing Drone
description: Long-range fixed-wing UAV built through QUT Aerospace Society for BVLOS observation missions, shark spotting, ecosystem monitoring, and agricultural surveying.
category: club
status: "Pre-maiden"
thumbnail: /assets/img/believer-fixed-wing/Believer.jpg
skills:
  - PX4
  - UAV Systems
  - RF Design
  - Systems Engineering
  - RC Aircraft
  - 3D Printing
---

## Project overview

Believer is a long-range, fixed-wing UAV built through the QUT Aerospace Society (QUTAS) for beyond-visual-line-of-sight (BVLOS) observation: shark spotting, monitoring threatened ecosystems, and agricultural surveying. As UAS Systems Lead and Program Manager, I lead the avionics integration and flight-readiness work, a V-tail, twin-motor airframe built around a Holybro Pixhawk 6X flight controller running PX4.

<figure>
  <a class="lightbox-trigger" href="{{ "/assets/img/believer-fixed-wing/Believer.jpg" | relative_url }}">
    <img src="{{ "/assets/img/believer-fixed-wing/Believer.jpg" | relative_url }}" alt="The Believer fixed-wing drone, ready to fly, with ground control laptop and transmitter">
  </a>
  <figcaption>The Believer fixed-wing drone, ready to fly, with ground control laptop and transmitter</figcaption>
</figure>

The aircraft is **pre-maiden**: avionics integration is largely complete and a redundant RC control link, the near-term goal in the original project proposal, is done. What's not yet true: it hasn't flown, RTK-precision GPS isn't online yet (antenna not fitted), and the onboard object-detection payload that's central to the project's long-term purpose is a future phase, not built or installed. None of that is operational today.

## System architecture

<figure>
  <a class="lightbox-trigger" href="{{ "/assets/img/believer-fixed-wing/icd-block-diagram-preview.png" | relative_url }}">
    <img src="{{ "/assets/img/believer-fixed-wing/icd-block-diagram-preview.png" | relative_url }}" alt="Believer ICD block diagram: the Pixhawk 6X at the centre, wired to the DBR4 receiver, RFD900x telemetry radio, M8N and ZED-F9P GPS modules, MS4525DO airspeed sensor, and PWM-driven control surfaces and motors, powered through the PM03D module from a 6S LiPo battery">
  </a>
  <figcaption>Believer's ICD block diagram: the full avionics architecture in one view</figcaption>
</figure>

The Pixhawk 6X sits at the centre of every link below. Each exists for a specific reason, not just "because the airframe has one":

| Link | Carries | Why it exists |
|---|---|---|
| RC link (GX12 → DBR4, ExpressLRS) | Pilot stick/switch commands, plus MAVLink | Primary flight control, shares one radio with telemetry instead of needing a second |
| Telemetry (RFD900x) | Two-way MAVLink to the ground station | Long-range command and monitoring, BVLOS by design |
| GPS 1 (u-blox M8N) | Primary position fix | Navigation today |
| GPS 2 (SparkFun ZED-F9P) | RTK-corrected position fix | Future centimetre-level positioning, not yet online, antenna not fitted |
| Airspeed (MS4525DO, I2C) | Differential pressure → airspeed estimate | Feeds the autopilot's airspeed control |
| Power (Holybro PM03D, INA228) | Battery voltage/current, isolated 5V servo rail | Battery monitoring and a servo supply independent of the flight controller's own rail |
| Actuators (PWM, MAIN 1-6) | Control surface and motor commands | V-tail, ailerons, and twin motors |

## Current status

**Completed:** avionics integration (flight controller, dual GPS routing, airspeed, power monitoring, actuator mapping), a redundant RC control link, and most of the maiden-flight build checklist (airframe, avionics mounting, pitot and magnetometer installation, antenna placement, a parachute bay repair).

**Verified:** the RC channel remap (below), the power module swap against real ground-test telemetry, and the RFD900 link configuration via two independent methods.

**Unresolved:** the RTK GPS module still needs its antenna fitted, the airframe still needs paint, and a final pre-flight configuration and tuning pass (with a build log) is still to be run.

**Next milestone:** fit the RTK antenna and complete that final configuration pass, then the maiden flight.

## Selected engineering challenges and decisions

**RC link reliability.** ExpressLRS Hybrid mode only carries the first 12 RC channels, but the flight-mode selector switch was originally wired to channel 13, so PX4 never saw it move, a silent failure on one of the aircraft's core safety controls. The fix was a full remap: arm and kill onto channels that are actually transmitted, the flight-mode selector onto channel 6, and a separate channel repurposed as a direct override into Hold, a fast backup path into a safe holding pattern independent of whatever mode the main selector is in. This mattered because arm, kill, and flight-mode are exactly the controls a pilot needs to trust completely; the remap is documented and verified in the parameter log.

**Power telemetry validation.** An earlier power module reported battery telemetry in a format the Pixhawk couldn't parse correctly, surfacing as a battery setup that couldn't be calibrated, a -100% charge reading, and a status panel reporting "Charge State: Ok" beside a blank voltage field. Battery monitoring underpins every other go/no-go call in flight, so trusting illogical readings wasn't an option. The fix was a Holybro PM03D power module (INA228-based), sourced partly out of pocket once the gap was identified, now confirmed reporting clean voltage and current.

**RF link tuning.** The RFD900x telemetry link worked out of the box, but getting the highest practical bitrate meant tuning AIR_SPEED (over-the-air rate) against SERIAL_SPEED (the UART rate to the flight controller), since the serial side has to stay within what the air side can actually sustain or the link bottlenecks. Encryption, channel-hopping range, and transmit power are separate tradeoffs again, each trading range, robustness, or regulatory headroom for bandwidth or security, not a single "better" setting. Because tuning is just plain text over a serial connection (RFDesign's own GUI tool, or AT commands directly), the same interface could eventually let a companion computer retune the link automatically in flight.

**Mechanical integration: a modular, glue-free avionics bay and antenna mount.** The avionics suite is still evolving toward the companion-computer phase, so I avoided gluing components to the airframe, a permanent fix for what's still an iterative design. Instead, a custom 3D-printed bay mounts the flight controller, GPS modules, telemetry radio, and power module mechanically, so a module can be swapped or repositioned by reprinting the bay rather than cutting into the airframe.

<div class="gallery">
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/believer-fixed-wing/avionics-bay-initial-design.jpg" | relative_url }}">
      <img src="{{ "/assets/img/believer-fixed-wing/avionics-bay-initial-design.jpg" | relative_url }}" alt="An early avionics mounting design: the RFD900 modem, a power distribution board, and a GPS module mounted on a flat bracket, no airframe yet">
    </a>
    <figcaption>An early mounting layout, worked out on the bench</figcaption>
  </figure>
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/believer-fixed-wing/avionics-bay-empty.jpg" | relative_url }}">
      <img src="{{ "/assets/img/believer-fixed-wing/avionics-bay-empty.jpg" | relative_url }}" alt="The empty avionics bay built into the airframe, before any avionics are installed, with the tail antenna feed-through already in place">
    </a>
    <figcaption>The bay built into the airframe, ready for avionics</figcaption>
  </figure>
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/believer-fixed-wing/avionics-bay-current.jpg" | relative_url }}">
      <img src="{{ "/assets/img/believer-fixed-wing/avionics-bay-current.jpg" | relative_url }}" alt="The current avionics bay inside the airframe, labelled: flight computer (Pixhawk 6X), long range modem, radio receiver, and GPS 1">
    </a>
    <figcaption>The current bay, fully populated</figcaption>
  </figure>
</div>

The RFD900x's own antennas drove a second mounting decision: at 900MHz they're too long to fit inside the bay while staying properly orthogonal to each other (the spacing that gives a diversity link its benefit), and a transmitter that close to the GPS receivers risked interference. A custom external mount solves both at once.

<div class="gallery">
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/believer-fixed-wing/antenna-mount-cad-design.png" | relative_url }}">
      <img src="{{ "/assets/img/believer-fixed-wing/antenna-mount-cad-design.png" | relative_url }}" alt="CAD render of the custom antenna mount: a knurled, threaded bulkhead fitting on a mounting bracket">
    </a>
    <figcaption>The custom mount, designed in CAD</figcaption>
  </figure>
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/believer-fixed-wing/external-antenna-and-sensor-mount.png" | relative_url }}">
      <img src="{{ "/assets/img/believer-fixed-wing/external-antenna-and-sensor-mount.png" | relative_url }}" alt="Rear view of the Believer airframe, showing the externally-mounted telemetry antenna and the GPS/magnetometer mast on top of the fuselage">
    </a>
    <figcaption>Fitted: the antenna and GPS/magnetometer mast, clear of the bay</figcaption>
  </figure>
</div>

## Verification or evidence

The power module decision above was driven by real, captured symptoms, not a hunch:

<div class="gallery">
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/believer-fixed-wing/battery-setup-uncalibrated.png" | relative_url }}">
      <img src="{{ "/assets/img/believer-fixed-wing/battery-setup-uncalibrated.png" | relative_url }}" alt="QGroundControl battery setup screen with the cell count at 0 and the voltage divider and amps-per-volt calibration both left at -1, uncalibrated">
    </a>
    <figcaption>Left uncalibrated: no sensible reading to calibrate against</figcaption>
  </figure>
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/believer-fixed-wing/battery-negative-100-percent.png" | relative_url }}">
      <img src="{{ "/assets/img/believer-fixed-wing/battery-negative-100-percent.png" | relative_url }}" alt="Battery indicator reading negative 100 percent">
    </a>
    <figcaption>A battery reading of -100%</figcaption>
  </figure>
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/believer-fixed-wing/battery-voltage-blank.png" | relative_url }}">
      <img src="{{ "/assets/img/believer-fixed-wing/battery-voltage-blank.png" | relative_url }}" alt="QGroundControl status panel showing Charge State Ok next to a blank voltage field">
    </a>
    <figcaption>"Charge State: Ok," voltage blank, the contradiction that gave it away</figcaption>
  </figure>
</div>

The RF link tuning above was verified two independent ways, RFDesign's own configuration tool and AT commands read directly over a serial terminal, confirming the same settings either way:

<div class="gallery">
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/believer-fixed-wing/rfd900-gui-tool.png" | relative_url }}">
      <img src="{{ "/assets/img/believer-fixed-wing/rfd900-gui-tool.png" | relative_url }}" alt="RFDesign's RFD SiK configuration tool, showing the RFD900P's settings: baud, air speed, frequency range, channel count, transmit power, and more">
    </a>
    <figcaption>RFDesign's configuration tool</figcaption>
  </figure>
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/believer-fixed-wing/rfd900-at-commands-terminal.png" | relative_url }}">
      <img src="{{ "/assets/img/believer-fixed-wing/rfd900-at-commands-terminal.png" | relative_url }}" alt="A PuTTY serial terminal session sending AT commands to the modem, listing its current parameters via ATI5">
    </a>
    <figcaption>The same settings, read back over AT commands</figcaption>
  </figure>
</div>

And an early ground test confirmed the integrated system could acquire GPS position in QGroundControl, well before anything was flight-ready:

<figure>
  <a class="lightbox-trigger" href="{{ "/assets/img/believer-fixed-wing/early-ground-test-qgc.png" | relative_url }}">
    <img src="{{ "/assets/img/believer-fixed-wing/early-ground-test-qgc.png" | relative_url }}" alt="QGroundControl's map view during an early ground test, showing GPS position acquired and the aircraft not yet armed in Manual mode">
  </a>
  <figcaption>Early ground test: GPS position acquired in QGroundControl</figcaption>
</figure>

## What I learned or am proud of

The most useful habit on this project wasn't any single fix, it was treating a small inconsistency as a reason to investigate rather than a reason to move on: a battery percentage that didn't add up, or a switch that silently stopped registering, each turned out to be a real issue worth catching before flight test rather than during it.

The other piece I'm proud of is configuration control. Believer's documentation lives in its own private GitHub repo, the project outline, interface control document, flight manual, spending history, datasheets, and the PX4 parameter change log, treated as the project's actual operating record rather than an afterthought. I maintain it with AI assistance, working from a `context` folder of standing directives that gets read at the start of every session, so conventions and accumulated facts carry across sessions rather than living in one chat history.

<figure>
  <a class="lightbox-trigger" href="{{ "/assets/img/believer-fixed-wing/context-folder-structure.png" | relative_url }}">
    <img src="{{ "/assets/img/believer-fixed-wing/context-folder-structure.png" | relative_url }}" alt="The Believer project's context folder: standing directives, project notes, and a running change log, plus a supporting-document archive">
  </a>
  <figcaption>Believer's context folder: standing directives, project notes, and a running change log</figcaption>
</figure>

Those same directives tell the AI to mark anything unconfirmed as TBD rather than guess, and to flag a judgement call rather than quietly make one, the same discipline behind catching the power-module and RC-channel issues above rather than discovering them later. Used this way, the documentation process improves traceability rather than trading it for speed, which matters more on a project whose records people will eventually rely on to fly the aircraft safely.

## Next phase

Fit the RTK GPS antenna, run a final pre-flight configuration and tuning pass with a build log, then the maiden flight. After that: flight controller tuning and expanded flight testing, per the original project roadmap. Further out, and not yet started: a companion computer and camera payload for onboard object detection, the long-term purpose the platform is being built toward, but a future phase, not current capability.

## Gallery

<div class="gallery">
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/believer-fixed-wing/actuator-output-config.png" | relative_url }}">
      <img src="{{ "/assets/img/believer-fixed-wing/actuator-output-config.png" | relative_url }}" alt="PX4 actuator output configuration screen, showing the six PWM channels mapped to the V-tail, ailerons, and motors">
    </a>
    <figcaption>PX4 actuator output configuration: six PWM channels mapped to the V-tail, ailerons, and motors</figcaption>
  </figure>
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/believer-fixed-wing/rfd900-module-photo.jpeg" | relative_url }}">
      <img src="{{ "/assets/img/believer-fixed-wing/rfd900-module-photo.jpeg" | relative_url }}" alt="The RFD900x telemetry radio module">
    </a>
    <figcaption>The RFD900x long-range telemetry radio</figcaption>
  </figure>
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/believer-fixed-wing/rfd900-pinout-diagram.png" | relative_url }}">
      <img src="{{ "/assets/img/believer-fixed-wing/rfd900-pinout-diagram.png" | relative_url }}" alt="RFD900x pinout diagram used to wire the module to the flight controller">
    </a>
    <figcaption>The RFD900x's pinout</figcaption>
  </figure>
</div>
