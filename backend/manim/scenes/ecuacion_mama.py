from manim import *
import numpy as np
import random


class EcuacionMama(Scene):
    def create_heart(self, scale=0.16, color="#E84A7A"):
        points = []
        for t in np.linspace(0, TAU, 600):
            x = 16 * np.sin(t) ** 3
            y = (
                13 * np.cos(t)
                - 5 * np.cos(2 * t)
                - 2 * np.cos(3 * t)
                - np.cos(4 * t)
            )
            points.append([scale * x, scale * y, 0])

        heart = VMobject()
        heart.set_points_smoothly(points)
        heart.close_path()
        heart.set_fill(color, opacity=0.92)
        heart.set_stroke("#FFD6E0", width=5)
        return heart

    def construct(self):
        self.camera.background_color = "#2B0F18"

        # -----------------------------
        # Background
        # -----------------------------
        glow_left = Circle(radius=3.7, fill_opacity=0.16, stroke_opacity=0, color="#B85C70")
        glow_left.move_to(LEFT * 3.2 + UP * 0.6)

        glow_right = Circle(radius=4.6, fill_opacity=0.13, stroke_opacity=0, color="#7A263A")
        glow_right.move_to(RIGHT * 3.2 + DOWN * 0.2)

        bg_heart = self.create_heart(scale=0.26, color="#7A263A")
        bg_heart.set_opacity(0.16)
        bg_heart.move_to(ORIGIN + DOWN * 0.15)
        bg_heart.scale(1.3)

        self.add(glow_left, glow_right, bg_heart)

        # -----------------------------
        # Block A: Intro
        # -----------------------------
        title = Text(
            "La ecuación de mamá",
            font_size=46,
            color="#FFF8EF",
            font="Georgia",
        ).to_edge(UP, buff=0.45)

        subtitle = Text(
            "Una animación hecha con amor",
            font_size=25,
            color="#FFD6E0",
            font="Georgia",
            slant=ITALIC,
        ).next_to(title, DOWN, buff=0.15)

        intro_group = VGroup(title, subtitle)

        self.play(FadeIn(title, shift=DOWN), FadeIn(subtitle, shift=DOWN), run_time=1.4)
        self.wait(0.4)

        # -----------------------------
        # Block B: Heart + equation elements
        # -----------------------------
        heart = self.create_heart(scale=0.135)
        heart.move_to(LEFT * 3.05 + DOWN * 0.15)

        heart_shadow = heart.copy()
        heart_shadow.set_fill("#B85C70", opacity=0.22)
        heart_shadow.set_stroke(opacity=0)
        heart_shadow.scale(1.15)

        terms = VGroup()
        term_data = [
            ("Amor", "#E84A7A"),
            ("Paciencia", "#FFD6E0"),
            ("Fortaleza", "#D9B46F"),
            ("Ternura", "#F7B7C6"),
            ("Sacrificio", "#FFF8EF"),
        ]

        for label, color in term_data:
            dot = Dot(radius=0.075, color=color)
            text = Text(label, font_size=31, color="#FFF8EF", font="Georgia")
            row = VGroup(dot, text).arrange(RIGHT, buff=0.22)
            terms.add(row)

        terms.arrange(DOWN, aligned_edge=LEFT, buff=0.33)
        terms.move_to(RIGHT * 2.55 + DOWN * 0.05)

        separator = Line(LEFT, RIGHT, color="#D9B46F", stroke_width=3)
        separator.set_width(3.4)
        separator.next_to(terms, DOWN, buff=0.35)

        result = Text(
            "= Mamá",
            font_size=42,
            color="#FFD6E0",
            font="Georgia",
            slant=ITALIC,
        ).next_to(separator, DOWN, buff=0.24)

        formula = Text(
            "Amor + Paciencia + Fortaleza + Ternura + Sacrificio",
            font_size=27,
            color="#FFF8EF",
            font="Georgia",
        )
        formula.scale_to_fit_width(10.6)
        formula.to_edge(DOWN, buff=0.55)

        equation_group = VGroup(heart_shadow, heart, terms, separator, result, formula)

        self.play(FadeIn(heart_shadow), DrawBorderThenFill(heart), run_time=1.6)

        # Heartbeat
        for _ in range(3):
            self.play(heart.animate.scale(1.10), heart_shadow.animate.scale(1.06), run_time=0.22)
            self.play(heart.animate.scale(1 / 1.10), heart_shadow.animate.scale(1 / 1.06), run_time=0.18)

        self.play(FadeIn(terms, shift=LEFT), run_time=1.0)
        self.play(Create(separator), FadeIn(result, shift=UP), run_time=0.9)
        self.play(FadeIn(formula, shift=UP), run_time=0.9)
        self.wait(1.0)

        # -----------------------------
        # Transition: clear old elements
        # -----------------------------
        self.play(
            FadeOut(equation_group),
            FadeOut(intro_group),
            run_time=1.2,
        )

        self.wait(0.3)

        # -----------------------------
        # Block C: Clean final message
        # -----------------------------
        final_heart = self.create_heart(scale=0.07)
        final_heart.move_to(UP * 2.15)
        final_heart.set_fill("#E84A7A", opacity=0.88)

        final_title = Text(
            "Mamá = Amor infinito",
            font_size=45,
            color="#FFF8EF",
            font="Georgia",
        )

        final_message = Text(
            "Gracias por ser mi primer hogar,\n"
            "mi apoyo incondicional y la fuerza\n"
            "que siempre me ha enseñado a seguir adelante.",
            font_size=26,
            color="#FFD6E0",
            font="Georgia",
            slant=ITALIC,
            line_spacing=0.95,
        )

        final_message.scale_to_fit_width(8.6)

        closing = Text(
            "Para ti, mamá. Con todo mi amor.",
            font_size=24,
            color="#D9B46F",
            font="Georgia",
            slant=ITALIC,
        )

        final_group = VGroup(final_title, final_message, closing).arrange(DOWN, buff=0.38)
        final_group.move_to(DOWN * 0.25)

        self.play(FadeIn(final_heart, scale=0.8), run_time=0.9)
        self.play(Write(final_title), run_time=1.1)
        self.play(FadeIn(final_message, shift=UP * 0.25), run_time=1.2)
        self.play(FadeIn(closing, shift=UP * 0.2), run_time=1.0)

        for _ in range(2):
            self.play(final_heart.animate.scale(1.12), run_time=0.22)
            self.play(final_heart.animate.scale(1 / 1.12), run_time=0.18)

        self.wait(2.5)