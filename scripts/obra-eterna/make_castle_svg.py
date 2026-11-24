# オブラ・エテルナ のカードの絵 第2版。
# 真ん中の塔(少し細く)+ まわりにありえない形の建物5つ(前の列2・後ろの列3)。
# 使い方(home-page のフォルダで): python3 scripts/obra-eterna/make_castle_svg.py public/obra-eterna/castle.svg
# 乱数は種を固定して、毎回同じ絵になるようにする。
import math, random, sys

R = random.Random(20261124)
W, H = 600, 600
G = 520            # 地面(前の列の足もと)
GB = 503           # 後ろの列の足もと
GOLD = "#e3c27a"
SIL = "#080a16"    # 前の列の影
BACK = "#151834"   # 後ろの列(かすんで少し明るい)
o = []
a = o.append
SERIF = "Didot,'Bodoni 72','Times New Roman',serif"

a(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img" aria-label="雲を突き抜けて空の外まで建ちつづける塔と、そのまわりの不思議な形の建物たち。てっぺんはまだ工事中">')
a('''<defs>
<linearGradient id="oe-sky" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0" stop-color="#03040b"/><stop offset=".45" stop-color="#0a0f2e"/>
 <stop offset=".78" stop-color="#241a48"/><stop offset=".93" stop-color="#5a2f45"/><stop offset="1" stop-color="#b9784a"/>
</linearGradient>
<radialGradient id="oe-moon" cx=".42" cy=".38" r=".7">
 <stop offset="0" stop-color="#fff6dc"/><stop offset=".7" stop-color="#ecd49a"/><stop offset="1" stop-color="#c9a35e"/>
</radialGradient>
<radialGradient id="oe-halo" cx=".5" cy=".5" r=".5">
 <stop offset="0" stop-color="#f3dca0" stop-opacity=".35"/><stop offset="1" stop-color="#f3dca0" stop-opacity="0"/>
</radialGradient>
<linearGradient id="oe-ground" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0" stop-color="#0d0c1c"/><stop offset="1" stop-color="#030308"/>
</linearGradient>
<linearGradient id="oe-spill" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0" stop-color="#ffcf7a" stop-opacity=".85"/><stop offset=".55" stop-color="#ffcf7a" stop-opacity=".35"/><stop offset="1" stop-color="#ffcf7a" stop-opacity="0"/>
</linearGradient>
<linearGradient id="oe-rim" x1="0" y1="0" x2="1" y2="0">
 <stop offset="0" stop-color="#1a1d38"/><stop offset=".5" stop-color="#0b0d1c"/><stop offset="1" stop-color="#05060e"/>
</linearGradient>
<linearGradient id="oe-shop" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0" stop-color="#fff0c8"/><stop offset=".5" stop-color="#ffd38a"/><stop offset="1" stop-color="#e9a54e"/>
</linearGradient>
<linearGradient id="oe-mist" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0" stop-color="#cfc8ea" stop-opacity="0"/><stop offset=".6" stop-color="#cfc8ea" stop-opacity=".16"/><stop offset="1" stop-color="#cfc8ea" stop-opacity="0"/>
</linearGradient>
<filter id="oe-blur" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
<filter id="oe-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="2.2"/></filter>
</defs>''')

def P(pts):
    return " ".join(f"{x:.1f},{y:.1f}" for x, y in pts)

def poly(pts, fill=SIL, extra=""):
    a(f'<polygon points="{P(pts)}" fill="{fill}" {extra}/>')

def rim(op=.35):
    return f'stroke="{GOLD}" stroke-opacity="{op}" stroke-width=".8"'

COLORS = (["#ffcf7a", "#ffe2a8", "#ff9ab8", "#8fe3d4", "#b9a2ff"], [6, 3, 1, 1, 1])

def win(x, y, dim=1.0, w=3, h=5):
    c = R.choices(*COLORS)[0]
    a(f'<rect x="{x:.1f}" y="{y:.1f}" width="{w}" height="{h}" fill="{c}" opacity="{R.uniform(.55, 1) * dim:.2f}"/>')

def windows(x0, x1, y0, y1, step_x=8, step_y=11, p=0.33, dim=1.0):
    for y in range(int(y0), int(y1), step_y):
        for x in range(int(x0), int(x1), step_x):
            if R.random() < p:
                win(x, y, dim)

# ===== 空 =====
a(f'<rect width="{W}" height="{H}" fill="url(#oe-sky)"/>')
for x in range(0, W + 1, 30):
    a(f'<line x1="{x}" y1="0" x2="{x}" y2="{G}" stroke="#8fb4ff" stroke-opacity=".035" stroke-width="1"/>')
for y in range(0, G + 1, 30):
    a(f'<line x1="0" y1="{y}" x2="{W}" y2="{y}" stroke="#8fb4ff" stroke-opacity=".035" stroke-width="1"/>')
for i in range(170):
    x = R.uniform(0, W)
    y = (R.random() ** 1.6) * G * 0.85
    a(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{R.choice([.5, .6, .7, .8, 1.0, 1.2])}" fill="#fff" opacity="{R.uniform(.25, .95):.2f}"/>')
for (x, y) in [(78, 62), (512, 96), (40, 250), (470, 30), (150, 120)]:
    a(f'<circle cx="{x}" cy="{y}" r="3.5" fill="#fff" opacity=".5" filter="url(#oe-glow)"/><circle cx="{x}" cy="{y}" r="1.3" fill="#fff"/>')
a('<circle cx="300" cy="215" r="190" fill="url(#oe-halo)"/>')
a('<circle cx="300" cy="215" r="98" fill="url(#oe-moon)" opacity=".92"/>')
a(f'<path d="M0 {G} L0 486 L60 470 L120 482 L180 462 L240 478 L300 468 L360 480 L420 460 L480 476 L540 466 L600 478 L600 {G} Z" fill="#120f26" opacity=".9"/>')

# ===== 後ろの列 =====
# (A) いびつな積み木 — 中二階がずれて重なり、外階段でつながる(左奥)
boxes = [(22, 448, 96, 55, -2), (40, 404, 74, 44, 4), (14, 366, 82, 38, -5), (52, 330, 64, 36, 6),
         (24, 298, 72, 32, -4), (62, 268, 44, 30, 8), (36, 246, 30, 22, -10)]
for (x, y, w, h, rot) in boxes:
    cx, cy = x + w / 2, y + h / 2
    a(f'<g transform="rotate({rot} {cx:.1f} {cy:.1f})">')
    a(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{BACK}" {rim(.22)}/>')
    a(f'<line x1="{x + 4}" y1="{y + h * .55:.1f}" x2="{x + w - 4}" y2="{y + h * .55:.1f}" stroke="{GOLD}" stroke-opacity=".25" stroke-width=".6"/>')  # 中二階の床
    for yy in (y + 6, y + h * .55 + 5):
        for xx in range(x + 5, x + w - 6, 7):
            if R.random() < .45:
                win(xx, yy, .75, 3, 4)
    a('</g>')
# 外階段(箱と箱をつなぐジグザグ)
for (x0, y0, x1, y1) in [(118, 452, 112, 406), (110, 404, 96, 368), (100, 364, 114, 332), (116, 330, 96, 300), (96, 296, 106, 270)]:
    n = 5
    pts = []
    for k in range(n + 1):
        t = k / n
        pts.append((x0 + (x1 - x0) * t + (4 if k % 2 else 0), y0 + (y1 - y0) * t))
    a(f'<polyline points="{P(pts)}" fill="none" stroke="{GOLD}" stroke-opacity=".5" stroke-width=".9"/>')
# 屋上の小さな木
for (x, y, r) in [(48, 244, 5), (58, 241, 4), (84, 263, 4)]:
    a(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#1f4a3c" opacity=".9"/>')

# (E) 輪っかが浮いて重なる塔(真ん中の右奥・細い)
a(f'<rect x="383" y="250" width="10" height="{GB - 250}" fill="{BACK}" {rim(.22)}/>')
rings = [(388, 470, 30, -8), (392, 432, 36, 10), (384, 396, 28, -14), (391, 360, 40, 6),
         (386, 324, 30, -10), (393, 290, 34, 14), (388, 262, 22, -6)]
for (cx, cy, rx, rot) in rings:
    a(f'<g transform="rotate({rot} {cx} {cy})">')
    a(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="7" fill="none" stroke="{BACK}" stroke-width="7"/>')
    a(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="7" fill="none" stroke="{GOLD}" stroke-opacity=".3" stroke-width=".7"/>')
    for k in range(0, 12):
        ang = math.pi * (k / 11)
        if R.random() < .55:
            x = cx + rx * math.cos(ang) - 1
            y = cy + 7 * math.sin(ang) - 1
            win(x, y, .8, 2, 2)
    a('</g>')
a('<circle cx="388" cy="246" r="3" fill="#8fe3d4" opacity=".7" filter="url(#oe-glow)"/>')

# (D) 逆さの円すい・上に空中庭園(右奥・少し傾く)
a('<g transform="translate(-14 0) translate(560 503) scale(.88) translate(-560 -503) rotate(5 560 503)">')
a(f'<rect x="555" y="380" width="10" height="{GB - 380}" fill="{BACK}" {rim(.22)}/>')
poly([(555, 384), (512, 300), (608, 300), (565, 384)], fill=BACK, extra=rim(.25))
for (y, l, r) in [(318, 522, 598), (334, 530, 590), (350, 539, 581), (366, 547, 573)]:
    for xx in range(l, r, 7):
        if R.random() < .5:
            win(xx, y, .8, 3, 4)
a(f'<ellipse cx="560" cy="300" rx="48" ry="7" fill="#1a3a33" {rim(.3)}/>')
for (x, y, r) in [(526, 293, 7), (540, 290, 9), (556, 288, 7), (572, 290, 10), (590, 293, 7), (548, 294, 5), (582, 295, 5)]:
    a(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#1f4a3c"/>')
for x in (530, 552, 575, 594):
    a(f'<circle cx="{x}" cy="296" r="1" fill="#ffe2a8"/>')
a('</g>')

# 前後のあいだの もや
a(f'<rect x="0" y="440" width="{W}" height="80" fill="url(#oe-mist)"/>')

# ===== 真ん中の塔(少し細く) =====
dash = f'stroke="{GOLD}" stroke-width="1.1" fill="none" stroke-dasharray="4 4"'
a(f'<path d="M276 118 L288 30 L300 -60 M324 118 L312 30 L300 -60" {dash} opacity=".75"/>')
for y in range(36, 118, 14):
    t = (118 - y) / 88
    a(f'<line x1="{276 + 12 * t:.1f}" y1="{y}" x2="{324 - 12 * t:.1f}" y2="{y}" {dash} opacity=".75"/>')
for y in range(-50, 30, 14):
    t = (30 - y) / 90
    a(f'<line x1="{288 + 12 * t:.1f}" y1="{y}" x2="{312 - 12 * t:.1f}" y2="{y}" {dash} opacity=".5"/>')
for (y, w) in [(52, 56), (8, 38)]:
    a(f'<rect x="{300 - w / 2}" y="{y}" width="{w}" height="5" fill="none" stroke="{GOLD}" stroke-width=".8" opacity=".55"/>')
poly([(252, 440), (260, 192), (340, 192), (348, 440)], fill="url(#oe-rim)", extra=rim())
poly([(254, 192), (257, 180), (343, 180), (346, 192)], extra=rim())
poly([(266, 180), (276, 118), (324, 118), (334, 180)], fill="url(#oe-rim)", extra=rim())
for x in range(264, 338, 9):
    a(f'<line x1="{x}" y1="118" x2="{x}" y2="166" stroke="{GOLD}" stroke-opacity=".45" stroke-width=".6"/>')
for y in (126, 138, 150, 162):
    a(f'<line x1="262" y1="{y}" x2="338" y2="{y}" stroke="{GOLD}" stroke-opacity=".45" stroke-width=".6"/>')
for x in range(264, 330, 18):
    a(f'<line x1="{x}" y1="118" x2="{x + 9}" y2="166" stroke="{GOLD}" stroke-opacity=".3" stroke-width=".5"/>')
windows(266, 334, 200, 432)
windows(280, 320, 128, 176, p=.18)

# クレーン
cg = f'stroke="{GOLD}" stroke-width="1" fill="none"'
a(f'<line x1="338" y1="180" x2="338" y2="66" {cg} opacity=".9"/><line x1="345" y1="180" x2="345" y2="66" {cg} opacity=".9"/>')
for y in range(176, 70, -8):
    a(f'<line x1="338" y1="{y}" x2="345" y2="{y - 8}" {cg} opacity=".55"/>')
a(f'<line x1="236" y1="66" x2="478" y2="66" {cg} opacity=".9"/><line x1="254" y1="72" x2="478" y2="72" {cg} opacity=".9"/>')
for x in range(254, 478, 8):
    a(f'<line x1="{x}" y1="72" x2="{x + 8}" y2="66" {cg} opacity=".55"/>')
a(f'<polygon points="338,66 342,46 345,66" fill="none" stroke="{GOLD}" stroke-width="1" opacity=".9"/>')
a(f'<line x1="342" y1="46" x2="254" y2="66" {cg} opacity=".6"/><line x1="342" y1="46" x2="478" y2="66" {cg} opacity=".6"/>')
a(f'<rect x="238" y="72" width="18" height="10" fill="{GOLD}" opacity=".7"/>')
a(f'<line x1="440" y1="72" x2="440" y2="104" stroke="{GOLD}" stroke-width=".7" opacity=".8"/>')
a(f'<rect x="420" y="104" width="40" height="4" fill="{GOLD}" opacity=".85"/>')
a('<circle cx="342" cy="44" r="4" fill="#ff4a3a" opacity=".6" filter="url(#oe-glow)"/><circle cx="342" cy="44" r="1.6" fill="#ff6a50"/>')

# 高い雲(塔だけが突き抜ける)
for (cx, cy, rx, ry, op) in [(80, 205, 140, 16, .34), (230, 214, 130, 14, .32), (420, 200, 150, 18, .36),
                              (560, 214, 110, 14, .3), (320, 192, 90, 9, .18)]:
    a(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="#cfc8ea" opacity="{op}" filter="url(#oe-blur)"/>')
for (x, y, k) in [(176, 166, 1), (188, 160, .9), (197, 170, .8), (166, 174, .85), (207, 163, .7), (154, 164, .75)]:
    a(f'<path d="M{x - 3 * k:.1f} {y - 1.5 * k:.1f} Q{x - 1.5 * k:.1f} {y - 2.6 * k:.1f} {x} {y} Q{x + 1.5 * k:.1f} {y - 2.6 * k:.1f} {x + 3 * k:.1f} {y - 1.5 * k:.1f}" stroke="#05060e" stroke-width="{1.1 * k:.2f}" fill="none"/>')

# ===== 前の列 =====
# (B) らせん階段が巻きつく、ねじれた塔(左手前)
cx0, top, bot = 178, 236, G
left, right = [], []
for k in range(0, 29):
    t = k / 28
    y = bot - (bot - top) * t
    w = 48 - 20 * t
    sway = 7 * math.sin(t * math.pi * 1.6)
    left.append((cx0 + sway - w / 2, y)); right.append((cx0 + sway + w / 2, y))
poly(left + right[::-1], extra=rim(.4))
for k in range(0, 28, 2):
    t = k / 28
    y = bot - (bot - top) * t
    sway = 7 * math.sin(t * math.pi * 1.6)
    for dx in (-8, 0, 8):
        if R.random() < .5:
            win(cx0 + sway + dx * (1 - .4 * t) - 1, y - 6, 1, 2, 6)
# らせんの通路(前を通る半分だけ描く)
for k in range(8):
    t0 = (k * 34 + 10) / (bot - top)
    y0 = bot - 10 - k * 34
    sway = 7 * math.sin(t0 * math.pi * 1.6)
    w = 48 - 20 * t0
    rx = w / 2 + 9
    xL, xR = cx0 + sway - rx, cx0 + sway + rx
    d = f'M{xL:.1f} {y0:.1f} A{rx:.1f} 8 0 0 0 {xR:.1f} {y0 - 17:.1f}'
    a(f'<path d="{d}" fill="none" stroke="{SIL}" stroke-width="5"/>')
    a(f'<path d="{d}" fill="none" stroke="{GOLD}" stroke-opacity=".55" stroke-width=".8" transform="translate(0 -2.6)"/>')
    for j in range(R.choice([0, 1, 1, 2])):
        tt = R.uniform(.2, .8)
        x = xL + (xR - xL) * tt
        y = y0 - 17 * tt + 7 * math.sin(math.pi * tt) - 4
        a(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="1" fill="#ffe2a8"/>')
# てっぺんの東屋(あずまや)
ts = 7 * math.sin(math.pi * 1.6)
tx = cx0 + ts
a(f'<path d="M{tx - 16:.1f} {top - 14} A16 14 0 0 1 {tx + 16:.1f} {top - 14} Z" fill="{SIL}" {rim(.45)}/>')
for dx in (-13, -4, 4, 13):
    a(f'<line x1="{tx + dx:.1f}" y1="{top - 14}" x2="{tx + dx:.1f}" y2="{top}" stroke="{GOLD}" stroke-opacity=".55" stroke-width="1"/>')
a(f'<rect x="{tx - 10:.1f}" y="{top - 10}" width="20" height="8" fill="#ffd690" opacity=".55"/>')
a(f'<line x1="{tx:.1f}" y1="{top - 28}" x2="{tx:.1f}" y2="{top - 44}" stroke="{GOLD}" stroke-opacity=".6" stroke-width="1"/>')
# 空中の歩道(らせんの塔 → 真ん中の塔)
a(f'<path d="M200 318 Q228 300 256 312" fill="none" stroke="{SIL}" stroke-width="5"/><path d="M200 315 Q228 297 256 309" fill="none" stroke="{GOLD}" stroke-opacity=".5" stroke-width=".7"/>')

# (C) 大きな木の建物 — 枝の先にお店のカプセル、枝の上を歩ける(右手前)
TX = 476
trunk = [(TX - 46, G), (TX - 24, G - 18), (TX - 15, G - 70), (TX - 13, 380), (TX + 13, 380), (TX + 15, G - 70), (TX + 26, G - 16), (TX + 50, G)]
poly(trunk, extra=rim(.4))
for (y, l) in [(470, 6), (440, 6), (410, 5)]:
    for dx in (-6, 2):
        if R.random() < .7:
            win(TX + dx, y, 1, 3, 6)
branches = [  # 始まり, 曲がり, 先, カプセルの大きさ
    ((TX - 6, 396), (TX - 40, 384), (418, 352), (20, 11)),
    ((TX + 8, 392), (TX + 46, 384), (550, 344), (22, 12)),
    ((TX - 4, 384), (TX - 22, 320), (436, 272), (20, 12)),
    ((TX + 4, 384), (TX + 34, 310), (528, 262), (22, 12)),
    ((TX, 382), (TX + 4, 300), (478, 214), (26, 14)),
]
for (s, c, e, (prx, pry)) in branches:
    d = f'M{s[0]} {s[1]} Q{c[0]} {c[1]} {e[0]} {e[1]}'
    a(f'<path d="{d}" fill="none" stroke="{SIL}" stroke-width="9" stroke-linecap="round"/>')
    a(f'<path d="{d}" fill="none" stroke="{GOLD}" stroke-opacity=".45" stroke-width=".8" transform="translate(0 -4.5)"/>')  # 歩道の手すり
    for k in range(1, 6):  # 手すりの柱
        t = k / 6
        x = (1 - t) ** 2 * s[0] + 2 * (1 - t) * t * c[0] + t * t * e[0]
        y = (1 - t) ** 2 * s[1] + 2 * (1 - t) * t * c[1] + t * t * e[1]
        a(f'<line x1="{x:.1f}" y1="{y - 4.5:.1f}" x2="{x:.1f}" y2="{y - 8:.1f}" stroke="{GOLD}" stroke-opacity=".4" stroke-width=".6"/>')
    ex, ey = e
    a(f'<ellipse cx="{ex}" cy="{ey - pry + 3}" rx="{prx}" ry="{pry}" fill="{SIL}" {rim(.5)}/>')
    a(f'<rect x="{ex - prx + 6}" y="{ey - pry}" width="{2 * prx - 12}" height="5" rx="2" fill="{R.choices(*COLORS)[0]}" opacity=".85"/>')
    a(f'<rect x="{ex - prx + 6}" y="{ey - pry}" width="{2 * prx - 12}" height="5" rx="2" fill="#ffcf7a" opacity=".35" filter="url(#oe-glow)"/>')
    a(f'<line x1="{ex - prx - 4}" y1="{ey + 3}" x2="{ex + prx + 4}" y2="{ey + 3}" stroke="{GOLD}" stroke-opacity=".55" stroke-width=".9"/>')  # デッキ
    a(f'<circle cx="{ex + R.uniform(-prx, prx):.1f}" cy="{ey + 1}" r="1" fill="#ffe2a8"/>')
# 小枝と小さな実(小さなお店)
for (x0, y0, x1, y1) in [(430, 300, 410, 290), (520, 290, 546, 288), (470, 260, 452, 240), (500, 330, 512, 316), (448, 348, 438, 330)]:
    a(f'<path d="M{x0} {y0} L{x1} {y1}" stroke="{SIL}" stroke-width="3" stroke-linecap="round"/>')
    a(f'<circle cx="{x1}" cy="{y1 - 3}" r="5" fill="{SIL}" {rim(.45)}/><circle cx="{x1}" cy="{y1 - 3}" r="1.8" fill="{R.choices(*COLORS)[0]}"/>')
# 空中の歩道(木のてっぺん → 真ん中の塔)
a(f'<path d="M454 206 Q400 186 344 210" fill="none" stroke="{SIL}" stroke-width="4"/><path d="M454 203 Q400 183 344 207" fill="none" stroke="{GOLD}" stroke-opacity=".45" stroke-width=".7"/>')

# ===== 真ん中の正面(豪華にまとめた大きな窓) =====
poly([(226, 462), (226, 440), (374, 440), (374, 462)], extra=rim())
poly([(214, G), (214, 462), (386, 462), (386, G)], extra=rim())
a(f'<line x1="214" y1="466" x2="386" y2="466" stroke="{GOLD}" stroke-opacity=".7" stroke-width="1"/>')
for x in range(230, 372, 8):
    a(f'<rect x="{x}" y="447" width="4" height="8" fill="#ffd690" opacity=".7"/>')
for x in (220, 248):
    pass
arch_x = [222, 246, 336, 360]
for x in arch_x:
    a(f'<path d="M{x} {G - 6} V492 A9 9 0 0 1 {x + 18} 492 V{G - 6} Z" fill="url(#oe-shop)"/>')
    a(f'<path d="M{x} {G - 6} V492 A9 9 0 0 1 {x + 18} 492 V{G - 6} Z" fill="#ffcf7a" opacity=".45" filter="url(#oe-glow)"/>')
    a(f'<path d="M{x - 2} {G - 6} V492 A11 11 0 0 1 {x + 20} 492 V{G - 6}" fill="none" stroke="{GOLD}" stroke-width="1.2"/>')
    a(f'<line x1="{x + 9}" y1="483" x2="{x + 9}" y2="{G - 6}" stroke="#b27a2e" stroke-width=".7" opacity=".8"/>')
    a(f'<line x1="{x}" y1="499" x2="{x + 18}" y2="499" stroke="#b27a2e" stroke-width=".7" opacity=".8"/>')
for x in (217, 243, 267, 331, 357, 383):  # 金の柱
    a(f'<rect x="{x - 1.5}" y="470" width="3" height="{G - 470}" fill="{GOLD}" opacity=".55"/>')
a(f'<rect x="214" y="{G - 6}" width="172" height="6" fill="{GOLD}" opacity=".35"/>')
# 正面の大きな門
a(f'<path d="M281 {G} V480 A19 19 0 0 1 319 480 V{G} Z" fill="url(#oe-shop)"/>')
a(f'<path d="M281 {G} V480 A19 19 0 0 1 319 480 V{G} Z" fill="#ffd690" opacity=".6" filter="url(#oe-glow)"/>')
a(f'<path d="M278 {G} V480 A22 22 0 0 1 322 480 V{G}" fill="none" stroke="{GOLD}" stroke-width="1.5"/>')
a(f'<circle cx="300" cy="470" r="3" fill="none" stroke="{GOLD}" stroke-width="1"/>')

# ===== 地面・光・人 =====
a(f'<rect x="0" y="{G}" width="{W}" height="{H - G}" fill="url(#oe-ground)"/>')
a(f'<polygon points="281,{G} 319,{G} 352,{H} 248,{H}" fill="url(#oe-spill)"/>')
a(f'<line x1="0" y1="{G}" x2="{W}" y2="{G}" stroke="{GOLD}" stroke-opacity=".35" stroke-width=".8"/>')

def person(x, y, s=1.0, up=False):
    a(f'<circle cx="{x}" cy="{y - 8.6 * s:.1f}" r="{1.5 * s:.1f}" fill="{SIL}"/>')
    a(f'<path d="M{x - 1.6 * s:.1f} {y} L{x - 1.4 * s:.1f} {y - 7 * s:.1f} L{x + 1.4 * s:.1f} {y - 7 * s:.1f} L{x + 1.6 * s:.1f} {y} Z" fill="{SIL}"/>')
    if up:
        a(f'<line x1="{x + 1.2 * s:.1f}" y1="{y - 6.5 * s:.1f}" x2="{x + 4.5 * s:.1f}" y2="{y - 12 * s:.1f}" stroke="{SIL}" stroke-width="{s:.1f}" stroke-linecap="round"/>')
for (x, y, s, up) in [(291, 536, 1.25, True), (299, 538, 1.2, False), (312, 546, 1.3, False), (284, 556, 1.35, False),
                      (306, 572, 1.5, True), (318, 566, 1.4, False), (276, 584, 1.5, False)]:
    person(x, y, s, up)

# 高さの寸法線(左はし・てっぺんは ∞)
dl = f'stroke="{GOLD}" stroke-width=".9" opacity=".75"'
a(f'<line x1="12" y1="{G}" x2="12" y2="74" {dl}/><line x1="4" y1="{G}" x2="20" y2="{G}" {dl}/>')
a(f'<polygon points="12,66 8,78 16,78" fill="{GOLD}" opacity=".85"/>')
a(f'<text x="12" y="62" text-anchor="middle" font-size="15" fill="{GOLD}" font-family="{SERIF}">∞</text>')
a(f'<text x="24" y="150" font-size="8.5" letter-spacing="2" fill="{GOLD}" opacity=".7" font-family="{SERIF}" transform="rotate(90 24 150)">ALTURA · SIN FIN</text>')
a(f'<text x="578" y="30" text-anchor="end" font-size="9" letter-spacing="2.5" fill="{GOLD}" opacity=".75" font-family="{SERIF}">PROYECTO Nº 001</text>')
a(f'<text x="578" y="44" text-anchor="end" font-size="8" letter-spacing="2" fill="{GOLD}" opacity=".5" font-family="{SERIF}">PLANO · ALZADO PRINCIPAL</text>')
a('</svg>')

open(sys.argv[1], "w").write("\n".join(o))
print("ok", len("\n".join(o)) // 1024, "KB")
