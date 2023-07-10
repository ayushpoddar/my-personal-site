import * as PIXI from "pixi";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsapMotionPathPlugin";

window.PIXI = PIXI;
window.gsap = gsap;

gsap.registerPlugin(MotionPathPlugin);
