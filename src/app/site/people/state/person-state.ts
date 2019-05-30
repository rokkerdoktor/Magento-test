import {Person} from '../../../models/person';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {RouterState} from '@ngxs/router-plugin';
import {tap} from 'rxjs/operators';
import {ToggleGlobalLoader} from '../../../state/app-state-actions';
import {LoadPerson, SetPerson} from './person-state-actions';
import {PeopleService} from '../people.service';
import {Title} from '../../../models/title';
import {MetaTag} from '../../../../common/core/meta/meta-tags.service';

export interface PersonStateModel {
    person?: Person;
    metaTags?: MetaTag[];
    knownFor?: Title[];
    credits?: {[key: string]: Title[]};
}

@State<PersonStateModel>({
    name: 'person',
    defaults: {
        knownFor: [],
        metaTags: [],
    }
})
export class PersonState {
    @Selector()
    static person(state: PersonStateModel) {
        return state.person;
    }

    @Selector()
    static credits(state: PersonStateModel) {
        return state.credits;
    }

    @Selector()
    static creditsCount(state: PersonStateModel): number {
        return Object.keys(state.credits).map(department => {
            return state.credits[department].length;
        }).reduce((a, b) => a + b, 0);
    }

    @Selector()
    static knownFor(state: PersonStateModel) {
        return state.knownFor;
    }

    @Selector()
    static backdrop(state: PersonStateModel) {
        const titleWithBackdrop = state.knownFor.find(title => !!title.backdrop);
        return titleWithBackdrop ? titleWithBackdrop.backdrop : null;
    }

    constructor(
        private store: Store,
        private people: PeopleService,
    ) {}

    @Action(LoadPerson)
    loadPerson(ctx: StateContext<PersonStateModel>) {
        const state = ctx.getState(),
            params = this.store.selectSnapshot(RouterState.state).root.firstChild.firstChild.params;

        if (state.person && state.person.id === +params.id) return;

        return this.people.get(params.id).pipe(tap(response => {
            this.store.dispatch(new SetPerson(response));
        }));
    }

    @Action(SetPerson)
    setPerson(ctx: StateContext<PersonStateModel>, action: SetPerson) {
        ctx.patchState({
            person: action.response.person,
            credits: action.response.credits,
            knownFor: action.response.knownFor,
            metaTags: action.response.seo,
        });
        this.store.dispatch(new ToggleGlobalLoader(false));
    }
}
