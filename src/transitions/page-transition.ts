import { Animation } from '../animations/animation';
import { Transition } from './transition';


/**
 * @hidden
 */
export class PageTransition extends Transition {
  enteringPage: Animation;

  init() {
    if (this.enteringView) {
      this.enteringPage = new Animation(this.plt, this.enteringView.pageRef());
      this.add(this.enteringPage.beforeAddClass('show-page'));

      // Resize content before transition starts
      this.beforeAddRead(() => {
        this.enteringView.readReady.emit();
      });
      this.beforeAddWrite(() => {
        this.enteringView.writeReady.emit();
      });
    }
  }

  destroy() {
    super.destroy();
    this.enteringPage && this.enteringPage.destroy();
    this.enteringPage = null;
  }

}
