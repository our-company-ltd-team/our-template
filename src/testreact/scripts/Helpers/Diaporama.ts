
interface IDiaporamaOptions {
    delay?: number;// = 6000;
    loop?: boolean;// = true
    autostart?: boolean;// = false
    opacity?: number;// = false
    on?: { show?: (index: number, slide: HTMLElement) => void; hide?: (index: number, slide: HTMLElement) => void; beforeshow?: (index: number, slide: HTMLElement) => void };
}

class Diaporama {
    public Current: number = -1;

    private _Slides: Array<HTMLElement>;
    private _Delay: number; // in ms
    private _Opacity: number; // in ms

    private _Loop = true;


    private _On: { show?: (index: number, slide: HTMLElement) => void; hide?: (index: number, slide: HTMLElement) => void; beforeshow?: (index: number, slide: HTMLElement) => void };

    constructor(slides: Array<HTMLElement>, options?: IDiaporamaOptions) {
        if (!slides.length)
            return;

        this._Slides = slides;
        this._Opacity = options.opacity || 1;
        this._Delay = options.delay || 6000;
        this._Loop = options.loop == undefined ? options.loop : true;

        this._On = options.on;

        var l = slides.length;
        while (l--) {
            let slide = slides[l];
            slide.addEventListener("transitionend", (e) => {
                if (slide.style.opacity == "0")
                    slide.style.display = "none";
            });
        }
        if (options.autostart)
            this.Play();
        else if (this.Current < 0) {
            this.Current = -1;
            this._Next();
        }
    }

    private _Playing: boolean;
    private _PlayingInte: number;

    public Play(): void {
        this._Playing = true;
        // add interval if not animating nor already existing.
        this._Next();
    }
    public Pause(): void {
        this._Playing = false;

        // remove interval already existing.
    }

    public Go(slideNum: number): void {

        this.Pause();
        this._Go(slideNum);
    }

    public Next(): void {
        this.Pause();
        this._Next();
    }
    public Previous(): void {
        this.Pause();
        this._Previous();
    }

    private _Go(slideNum: number): void {
        if(this.Current == slideNum) return;
        var newElt = this._Slides[slideNum];
        if (newElt.style.display == "none") {
             newElt.style.opacity = "0";
        }
        newElt.style.display = "block";
        newElt.style.zIndex = "1";
        setTimeout(() => {
            newElt.style.opacity = this._Opacity.toString();
        }, 1);
        this._OnSlideShow(slideNum, newElt);

        if (this.Current >= 0) {
            var oldElt = this._Slides[this.Current];
            this._OnSlideHide(this.Current, oldElt);
            oldElt.style.zIndex = "0";
            setTimeout(() => {
                oldElt.style.opacity = "0";
            }, 1);
        }
        this.Current = slideNum;
    }

    private _OnSlideShow(index: number, slide: HTMLElement) {
        if (this._Playing && this._Slides.length > 1) {
            clearTimeout(this._PlayingInte);
            this._PlayingInte = setTimeout(this._Next.bind(this), this._Delay);
        }
        if (this._On && this._On.show) {
            this._On.show(index, slide);
        }
    }
    private _OnSlideHide(index: number, slide: HTMLElement) {
        if (this._On && this._On.hide) {
            this._On.hide(index, slide);
        }
    }

    private _Next(): void {
        if (!this._Loop && this.Current >= (this._Slides.length - 1)) return;
        this._Go((this.Current + 1) % this._Slides.length);
    }

    private _Previous(): void {
        if (!this._Loop && this.Current <= 0) return;
        this._Go((this.Current - 1 + this._Slides.length) % this._Slides.length);
    }


    public Destroy() {
        if (this._PlayingInte)
            clearTimeout(this._PlayingInte);


    }
}

export default Diaporama;