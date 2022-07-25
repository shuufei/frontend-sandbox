# Rome Sandbox

## rome vs prettier

```
~/work/projects/frontend-sandbox/apps/rome-sandbox main*
❯ time npm run format:rome

> rome-sandbox@1.0.0 format:rome
> rome format --write ./src/main.js

Formatted 1 files in 69ms
npm run format:rome  0.39s user 0.11s system 80% cpu 0.625 total

~/work/projects/frontend-sandbox/apps/rome-sandbox main*
❯ time npm run format:prettier

> rome-sandbox@1.0.0 format:prettier
> prettier --write ./src/main.js

src/main.js 299ms
npm run format:prettier  0.97s user 0.16s system 104% cpu 1.073 total
```

### 要考慮事項

- PrettierとRomeでフォーマットを適用するルールを揃える
- サポートするルールが多いと、その分計算コストもかさむはず？

