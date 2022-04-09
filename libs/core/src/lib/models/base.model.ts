import { Observable } from 'rxjs';
import { BaseEntity } from '../base.entity';
import {
  PaintedEvent,
  ParentChangeEvent,
  SelectionEvent,
} from '../interfaces/event.interface';
import { BaseModelOptions } from '../interfaces/options.interface';
import { createValueState, ValueState } from '../state';

export class BaseModel<E extends BaseEntity = BaseEntity> extends BaseEntity {
  protected parent$: ValueState<any>;
  protected selected$: ValueState<boolean>;
  protected hovered$: ValueState<boolean>;
  protected painted$: ValueState<PaintedEvent>;

  constructor(options: BaseModelOptions<any>) {
    super({ namespace: 'default', ...options });

    this.parent$ = createValueState(
      options.parent,
      this.entityPipe('ParentsChange')
    );

    this.selected$ = createValueState<boolean>(
      false,
      this.entityPipe('SelectedChange')
    );

    this.hovered$ = createValueState<boolean>(
      false,
      this.entityPipe('HoveredChange')
    );

    this.painted$ = createValueState<PaintedEvent>(
      new PaintedEvent(this, false),
      this.entityPipe('PaintedChange')
    );
  }

  getParent(): E {
    return this.parent$.value;
  }

  setParent(parent: E): void {
    this.parent$.set(parent);
  }

  parentChanges(): Observable<ParentChangeEvent<E>> {
    return this.parent$.select((p) => new ParentChangeEvent(this, p));
  }

  getPainted(): PaintedEvent {
    return this.painted$.value;
  }

  setPainted(painted = true): void {
    this.painted$.set(new PaintedEvent(this, painted));
  }

  paintChanges(): Observable<PaintedEvent> {
    return this.painted$.value$;
  }

  getHovered(): boolean {
    return this.hovered$.value;
  }

  setHovered(hovered = true): void {
    this.hovered$.set(hovered);
  }

  selectHovered(): Observable<boolean> {
    return this.hovered$.select();
  }

  getSelected(): boolean {
    return this.selected$.value;
  }

  selectSelected(): Observable<boolean> {
    return this.selected$.select();
  }

  setSelected(selected = true): void {
    this.selected$.set(selected);
  }

  selectionChanges(): Observable<SelectionEvent> {
    return this.selected$.select(
      (selected) => new SelectionEvent(this, selected)
    );
  }

  getSelectedEntities(): BaseModel<E>[] {
    return this.getSelected() ? [this] : [];
  }
}
