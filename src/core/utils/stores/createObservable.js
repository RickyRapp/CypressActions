import { Observable } from 'rxjs';

export function createObservable(observers, action) {
    return Observable.create(observer => {
        const refreshFn = async function refreshCentral() {
            action()
                .then(response => {
                    observer.next(response.data)
                }, err => observer.error(err));
        };

        observers.push(refreshFn);

        refreshFn();

        return () => {
            const itemIndex = observers.indexOf(refreshFn);
            if (itemIndex !== -1) {
                observers.splice(itemIndex, 1);
            }
        };
    });
}

