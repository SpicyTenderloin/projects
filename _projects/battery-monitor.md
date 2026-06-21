---
title: Battery Monitor
description: An ESP32-based battery current/voltage monitor, with a live-logging Python GUI and a multi-point voltage tap harness.
category: personal
thumbnail: /assets/img/battery-monitor/discharge-test-plot.jpg
skills:
  - Embedded C
  - Embedded Systems
  - Microcontrollers
  - PlatformIO
  - Python
  - Analog Circuit Design
  - Op-Amp Design
  - Power Electronics
---

**Task:** build a standalone tool for logging a battery's discharge current and voltage over time, accurate enough to actually trust for real battery testing rather than just a rough indication.

**Approach:** an ESP32 measures shunt current through an INA240A3 current-sense amplifier (100x gain, across a 0.5mΩ shunt) and streams readings to a PC over serial. On boot, the firmware measures and removes the ADC's own bias offset by averaging 300 samples before any load is connected, and a hard interlock in the firmware refuses to recalibrate while a test is running, so a test can't be invalidated by a stray recalibration mid-discharge. Every reported current value is itself an average of 100 ADC samples, and the firmware estimates its own expected measurement noise from first principles (quantisation noise plus an assumed ADC noise floor), so the achievable precision is known rather than just assumed.

A Python application on the PC side talks to the ESP32 over serial: it plots the live discharge current as it happens, integrates it into a running amp-hour total, and logs every reading to a timestamped CSV file for later analysis. A few simple text commands (test, calibrate, report, quit) drive the whole thing rather than a complex GUI, the live plot window is the only graphical element.

<figure>
  <a class="lightbox-trigger" href="{{ "/assets/img/battery-monitor/discharge-test-plot.jpg" | relative_url }}">
    <img src="{{ "/assets/img/battery-monitor/discharge-test-plot.jpg" | relative_url }}" alt="The Python logger's live plot of discharge current versus elapsed time, alongside the running amp-hour total and raw serial output">
  </a>
  <figcaption>A real logged discharge test: live current plot, running amp-hour total, and raw serial output, with brief drops where the load was toggled during testing</figcaption>
</figure>

## A multi-point voltage tap harness

Alongside the current-sense logging, I also designed an op-amp buffered voltage-tap harness: a resistor divider and a dedicated op-amp buffer for each of several tap points along the battery string, from roughly 8V up to 28V, so the same ADC can read voltage at multiple points across the pack rather than just the terminal voltage. Buffering each tap before the ADC keeps the divider's loading independent of whatever else is connected downstream, so adding the monitoring circuit doesn't itself disturb the voltage it's trying to measure.

<figure>
  <a class="lightbox-trigger" href="{{ "/assets/img/battery-monitor/voltage-tap-harness-schematic.jpg" | relative_url }}">
    <img src="{{ "/assets/img/battery-monitor/voltage-tap-harness-schematic.jpg" | relative_url }}" alt="Schematic of the voltage tap harness: a resistor divider and op-amp buffer for each battery voltage tap, feeding separate ADC channels">
  </a>
  <figcaption>The voltage tap harness: a buffered resistor divider per tap point, each feeding its own ADC channel</figcaption>
</figure>

**Outcome:** a working two-part monitoring system: a calibrated ESP32 current logger with a real, validated discharge test behind it, and a multi-point voltage tap harness that extends the same idea to monitoring the pack at several points along its length, not just its terminal voltage.

Code: [github.com/SpicyTenderloin/battery_monitor](https://github.com/SpicyTenderloin/battery_monitor)
