---
title: Search and Rescue UAS
description: A nine-person team's autonomous unmanned aircraft system for search and rescue, built over two semesters.
category: university
skills:
  - UAV Systems
  - Autonomous Systems
  - ROS
  - Computer Vision
  - Linux
  - Systems Engineering
  - Teamwork
---

**Task:** as part of a nine-person team over two semesters, develop an unmanned aerial system capable of autonomously searching for a missing person, recognising them, and delivering aid, without a pilot in the loop once the mission started.

**Approach:** I worked within the Autopilot and Navigation subsystem. The aircraft flew a planned search pattern from takeoff to landing entirely autonomously, avoiding obstacles marked in an occupancy grid, while a companion computer (a Raspberry Pi) ran a custom-trained YOLOv5 model over an OAK-D RGB-D camera feed to detect a target mannequin in real time. On a positive detection, the aircraft would divert from its search pattern to deliver an EpiPen to the target, streaming mission data back to a ground control station throughout. I came into the project with limited prior experience in ROS and Linux, and leaned on a systems engineering approach, breaking the navigation subsystem's requirements down into concrete, testable deliverables, to get up to speed and contribute effectively alongside teammates who'd worked in this stack before.

**Outcome:** a working autonomous search-and-rescue demonstration: takeoff, a fully autonomous obstacle-avoiding search pattern, real-time onboard object detection, an autonomous diversion to the target, and a simulated aid delivery, all without manual piloting. The result came down to dedicated teamwork and structured planning across a large team more than any one person's individual contribution, which is the main thing I took from the project.

No photos or video of the aircraft are on this page yet, that would be a good addition if footage from the project is still around.
