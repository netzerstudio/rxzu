module.exports = {
	types: [
		{ value: 'feat', name: 'โจ  - FEATURE: a new feature' },
		{ value: 'fix', name: '๐  - FIX: a bug fix' },
		{ value: 'chore', name: '๐ง  - CHORE: changes to the build process or auxiliary tools and libraries such as documentation generation' },
		{ value: 'docs', name: '๐  - DOCS: documentation only changes' },
		{
			value: 'style',
			name: '๐จ  - STYLE: changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) '
		},
		{ value: 'refactor', name: '๐ทโ  - REFACTOR: a code change that neither fixes a bug nor adds a feature' },
		{ value: 'perf', name: 'โก๏ธ  - PERFORMANCE: code change that improves performance' },
		{ value: 'ci', name: '๐จ  - CONTINUOUS INTEGRATION: changes that affect either the build or deployment process' },
		{ value: 'test', name: 'โ  - TEST: adding missing tests or correcting existing test' }
	],

	messages: {
		body: '๐  - Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
		breaking: '๐ฅ  - List any BREAKING CHANGES (optional):\n',
		confirmCommit: 'โ๏ธ  - Are you sure you want to proceed with the commit above?',
		customScope: 'โคด๏ธ  - Denote the SCOPE of this change, e.g. file name or module:',
		footer: '๐  - List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
		subject: 'โ๏ธ  - Write a SHORT, IMPERATIVE tense description of the change:\n',
		type: "โน๏ธ  - Select the type of change that you're committing:"
	},

	allowBreakingChanges: ['feat', 'fix'],
	allowCustomScopes: true,
	subjectLimit: 82
};
