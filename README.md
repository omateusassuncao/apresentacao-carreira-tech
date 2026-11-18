# Carreira Tech e seu futuro!

Palestra para alunos do ensino médio sobre carreira em tecnologia.

Apresentação de slides feita em **HTML, CSS e JavaScript puros** (sem dependências nem build), publicada com o **GitHub Pages**.

## Como navegar

| Ação | Teclas / gesto |
|---|---|
| Próximo slide | `→` `↓` `Espaço` `PageDown` `Enter` · deslizar para a esquerda |
| Slide anterior | `←` `↑` `Shift+Espaço` `PageUp` · deslizar para a direita |
| Primeiro / último | `Home` / `End` |
| Tela cheia | `F` |
| Tema claro/escuro | `T` (o escuro é o padrão; a escolha fica salva) |
| Notas do apresentador | `P` (abre uma janela separada) |

Cada slide tem endereço próprio: `.../#/5` abre direto no slide 5.

**Exportar PDF:** abra no Chrome/Edge, `Ctrl+P` → *Salvar como PDF* (um slide por página; ative "Gráficos de fundo").

## Como editar os slides

Todo o conteúdo fica em `index.html`. Cada slide é um bloco:

```html
<section class="slide" data-layout="list">
  <p class="eyebrow">01 · agenda</p>
  <h2>Título</h2>
  <ul class="bullets"><li>Item</li></ul>
  <aside class="notes">Notas que só você vê (tecla P).</aside>
</section>
```

Para criar um slide, duplique uma `<section>`; a ordem no arquivo é a ordem da apresentação. Layouts disponíveis:

- `cover` — capa / encerramento (`cover end`)
- `list` — título + tópicos
- `columns` — duas colunas com cards
- `stats` — números em destaque
- `timeline` — linha do tempo (`<ol class="timeline">`, `li.is-now` destaca o marco atual)
- `section` — divisória com texto gigante (`<p class="section-big">`)
- `about` — texto + selos de hobbies (`.chips`) à esquerda e mosaico de fotos (`.mosaic`) à direita
- `hobbies` — grade de cards com ícone (`.hobby`, `.hobby-icon`)
- `gallery` — fotos lado a lado (`<figure class="photo"><img src="assets/img/fotos/…">`); se o arquivo não existir, aparece um quadro com o nome esperado

Nos terminais, `<span class="tk-fill">[...]</span>` marca campos para preencher ao vivo e `<button class="copy-btn">Copiar</button>` copia o código.
- `quote` — citação centralizada
- `code` — janela de terminal com código
- `image` — imagem + legenda (coloque os arquivos em `assets/img/`)

Cores e fontes ficam como variáveis no início de `assets/css/style.css`.

## Rodar localmente

```bash
python3 -m http.server 8000
```

Depois abra `http://localhost:8000`.

## Publicar no GitHub Pages

1. No GitHub: **Settings → Pages**.
2. Em *Build and deployment*, escolha **Deploy from a branch**, branch `main` e pasta `/ (root)`.
3. Salve. Em cerca de 1 minuto o site fica em
   `https://omateusassuncao.github.io/apresentacao-carreira-tech/`.

## Estrutura

```
index.html            # slides
assets/css/style.css  # visual (temas, layouts, impressão)
assets/js/slides.js   # navegação, tema, tela cheia, notas
assets/img/           # imagens
PERFIL.md             # dados profissionais do autor e mapa dados → slides
.nojekyll             # o Pages serve os arquivos como estão
```
