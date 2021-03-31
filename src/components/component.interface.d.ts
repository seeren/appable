export interface ComponentInterface {
    selector: string;
    template: string;
    components: ComponentInterface[];
    emit(type: string): boolean | void;
    onInit?(): void;
    onUpdate?(element: HTMLElement): void;
    onDestroy?(): void;
    onBack?(): boolean;
    onPause?(): void;
    onResume?(): void;
}
