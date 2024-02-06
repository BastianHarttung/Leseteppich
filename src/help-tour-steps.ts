import { StepType } from "@reactour/tour";

export const steps: StepType[] = [
  {
    selector: `[data-tut="reactour_fullscreen"]`,
    content: `Hier kannst du die App ins Vollbild setzen, damit die Leiste vom Browser verschwindet. (Leider nicht beim Iphone)`
  },
  {
    selector: '[data-tut="reactour_image"]',
    content: `Das Foto vom Leseteppich kannst du anklicken und es dir in groß anschauen.`,
    // observe: '[data-tut="reactour_modal-image"]'
  },
  {
    selector: '[data-tut="reactour_more-btn"]',
    content: `Hier findest du deine 5 besten Leistungen. Deine Bestleistungen werden ausschließlich auf deinem Gerät gespeichert.`,
  },
  {
    selector: '[data-tut="reactour_time"]',
    content: `Hier wird die Zeit eingestellt, in der du den Leseteppich durchmachen willst.`,
  },
  {
    selector: '[data-tut="reactour_kings"]',
    content: `Möchtest du dass die Könige (also A,E,I,O und U) markiert werden?`,
  },
  {
    selector: '[data-tut="reactour_start"]',
    content: `Alles eingestellt? Dann gehts hier los.`,
  },
]