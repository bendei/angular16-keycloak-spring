/**
 * Helper methods for integration testing
 */

import {DebugElement} from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

/**
 * error handling function for promises during setup and clean up of tests
 */
export function setupFailed(err: object) {
  throw JSON.stringify(err);
}

/**
 * converts blob between image types
 * TODO convert to promise callback
 */
export function convertImage(src: Blob,
                             targetContentType: string,
                             cb: (result: Blob) => void,
                             resize?: { w?: number, h?: number }) {
  const reader: FileReader = new FileReader();

  reader.readAsDataURL(src);
  reader.onload = () => {
    const image: HTMLImageElement = document.createElement('img');
    image.onload = () => {
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      canvas.width = image.width + (resize && resize.w || 0);
      canvas.height = image.height + (resize && resize.h || 0);
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(image, 0, 0);
      }

      const arr: string[] = canvas.toDataURL(targetContentType).split(',');
      const match = arr[0].match(/:(.*?);/);
      if (match == null) {
        console.error('can not extract image');
        return;
      }
      const mime: string = match[1];
      const bstr: string = atob(arr[1]);
      let n: number = bstr.length;
      const u8arr: Uint8Array = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      cb(new Blob([u8arr], {type: mime}));
    };

    if (reader.result == null) {
      throw new Error('Result of FileReader is null!');
    } else if (typeof reader.result !== 'string') {
      throw new Error('Result of FileReader is not of type String!');
    }
    image.src = reader.result;
  };
}

/** Button events to pass to `DebugElement.triggerEventHandler` for RouterLink event handler */
export const ButtonClickEvents = {
  left:  { button: 0 },
  right: { button: 2 }
};

/** Simulate element click. Defaults to mouse left-button click event. */
export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}
