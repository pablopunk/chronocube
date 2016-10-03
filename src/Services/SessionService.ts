
export class SessionService {
    sessions :Array<Session>;

    constructor(sessions :Array<Session> = [new Session()]) {
        this.sessions = sessions;
    }

    new(name :string) {
        if (!this.exists(name))
            this.sessions.push(new Session(name));
    }

    remove(index :number) {
        if (index && index <= this.sessions.length)
            this.sessions.splice(index, 1);
    }

    exists(name :string) {
        for (var session of this.sessions)
            if (session.name == name) return true;
        return false;
    }
}