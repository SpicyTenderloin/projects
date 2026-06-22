---
title: Search and Rescue UAS
description: A nine-person team's autonomous unmanned aircraft system for search and rescue, built over two semesters.
category: university
status: "Completed"
thumbnail: /assets/img/search-and-rescue-uas/team-photo.jpg
skills:
  - Path Planning
  - Autonomous Systems
  - ROS
  - Python
  - Systems Engineering
  - UAV Systems
---

## Project overview

A nine-person team's two-semester university capstone project: an autonomous multirotor UAS that searches for a missing person, recognises them, and delivers aid, without a pilot in the loop once the mission starts. I worked within the Autopilot and Navigation subsystem. This project is complete, a fixed-scope assessment with a working autonomous demonstration delivered at the end of two semesters, not an ongoing platform.

<figure>
  <a class="lightbox-trigger" href="{{ "/assets/img/search-and-rescue-uas/team-photo.jpg" | relative_url }}">
    <img src="{{ "/assets/img/search-and-rescue-uas/team-photo.jpg" | relative_url }}" alt="The nine-person team, with the aircraft">
  </a>
  <figcaption>The team behind the project</figcaption>
</figure>

## System architecture

A Pixhawk flight controller handled low-level flight control and talked to a Raspberry Pi companion computer over MAVLink. The Pi ran ROS, a custom-trained YOLOv5 detection model, and the mission logic tying it together.

| Link | Carries | Why it exists |
|---|---|---|
| Pixhawk ↔ Raspberry Pi (MAVLink) | Flight commands and telemetry | Lets the Pi's mission logic command the autopilot without reimplementing flight control |
| OAK-D camera → Pi | RGB-D image stream | Onboard real-time object detection (a teammate's YOLOv5 model) |
| Pi → ground control station | Live mission/ROS data | Monitoring an autonomous flight with no pilot in the loop |
| Onboard occupancy grid | Obstacle map | Autonomous obstacle avoidance during the search pattern |

<figure>
  <a class="lightbox-trigger" href="{{ "/assets/img/search-and-rescue-uas/drone-closeup.jpg" | relative_url }}">
    <img src="{{ "/assets/img/search-and-rescue-uas/drone-closeup.jpg" | relative_url }}" alt="Close-up of the aircraft on the bench, with its companion computer, flight controller, and connectors visible">
  </a>
  <figcaption>The aircraft up close: companion computer, flight controller, and connectors</figcaption>
</figure>

## Current status

**Completed:** a full autonomous mission, takeoff, an obstacle-avoiding search pattern, real-time onboard detection, and an autonomous diversion to deliver an EpiPen, all without manual piloting.

**Verified:** real flight-test telemetry (below) confirms the detection, planning, and ground-monitoring chain worked together live, not just in isolation.

**Not pursued further:** this was a closed, fixed-scope university assessment. No further development is planned, the team's two semesters concluded with the working demonstration described here.

## Selected engineering challenges and decisions

**Guaranteeing full search coverage.** The camera's field of view is limited, so a naive flight path risks leaving gaps in the search area, directly undermining the mission's purpose. I built a Python coverage-path planner: a lawnmower-style pattern that computes row spacing from the camera's footprint at the planned altitude and a target overlap percentage between passes, alternates sweep direction each row, and stitches in safe takeoff, staging, and return waypoints around the actual search pattern rather than handling them as a separate, error-prone step. This mattered because both gaps in coverage and an unsafe transition into or out of the search pattern are the kind of mistake that's easy to make by hand and hard to notice until it matters.

<figure>
  <a class="lightbox-trigger" href="{{ "/assets/img/search-and-rescue-uas/flight-plan-topdown.png" | relative_url }}">
    <img src="{{ "/assets/img/search-and-rescue-uas/flight-plan-topdown.png" | relative_url }}" alt="Top-down plot of the generated search pattern, showing the waypoint path and overlapping camera footprints covering the flight area">
  </a>
  <figcaption>Generated search pattern: waypoint path and overlapping camera footprints, no coverage gaps</figcaption>
</figure>

## Verification or evidence

The detection and planning chain running live, the target detected and an occupancy-grid path planned around obstacles in RViz, alongside the ROS logs from the onboard Pi and the ground control station terminal during the same test:

<div class="gallery">
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/search-and-rescue-uas/gcs-visualisation.jpg" | relative_url }}">
      <img src="{{ "/assets/img/search-and-rescue-uas/gcs-visualisation.jpg" | relative_url }}" alt="RViz showing the detected target and occupancy grid with a planned path, next to a tmux session SSH'd into the onboard Pi showing live ROS logs">
    </a>
    <figcaption>RViz: detected target and planned path around obstacles, alongside live ROS logs from the onboard Pi</figcaption>
  </figure>
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/search-and-rescue-uas/gcs-terminal.jpg" | relative_url }}">
      <img src="{{ "/assets/img/search-and-rescue-uas/gcs-terminal.jpg" | relative_url }}" alt="Ground control station terminal showing live ROS topic data during a test flight">
    </a>
    <figcaption>Ground control station terminal, the same test flight</figcaption>
  </figure>
</div>

## What I learned or am proud of

I came into this project with limited prior experience in ROS and Linux, and leaned on a systems engineering approach to get up to speed without slowing the team down: breaking the navigation subsystem's requirements into concrete, testable deliverables (calibrating the Pixhawk, verifying the Pi-to-flight-controller link, then building up to full autonomous flight) rather than trying to absorb the whole stack at once. The result ultimately came down to dedicated teamwork and structured planning across a large team more than any one person's individual contribution, which is the main thing I took from the project: on a team this size, the planning and integration discipline matters as much as any individual piece of code.

## Next phase

None planned, this assessment is complete. The coverage-path-planning technique is the one piece of this project I'd consider reusing directly on a future UAS project.

## Gallery

<div class="gallery">
  <figure>
    <a class="lightbox-trigger" href="{{ "/assets/img/search-and-rescue-uas/aircraft-hardware.jpg" | relative_url }}">
      <img src="{{ "/assets/img/search-and-rescue-uas/aircraft-hardware.jpg" | relative_url }}" alt="The quadcopter on the test bench, showing the flight controller and companion computer mounted on the frame">
    </a>
    <figcaption>The aircraft on the test bench</figcaption>
  </figure>
</div>
