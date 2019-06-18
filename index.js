const { Plugin } = require('release-it');

class GitFlowPlugin extends Plugin {
    async beforeBump() {
        const version = this.config.contextOptions.version;
        this.exec(`git checkout -b release/${version} develop`);
    }
    afterRelease() {
        this.exec(`git checkout master`);
        this.exec(`git merge --no-ff release/${version}`);
        this.exec(`git checkout master`);
        this.exec(`git tag -a ${version}`);

        this.exec(`git checkout develop`);
        this.exec(`git merge --no-ff release/${version}`);

        this.exec(`git branch -d release/${version}`);
    }
}

module.exports = GitFlowPlugin;
