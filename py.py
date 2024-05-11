import pygame # type: ignore
import sys

# Initialize Pygame
pygame.init()

# Set up the screen dimensions
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Game UI Example")

# Define some colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)

# Define a font for text
font = pygame.font.Font(None, 36)

def draw_text(text, font, color, surface, x, y):
    text_obj = font.render(text, True, color)
    text_rect = text_obj.get_rect()
    text_rect.topleft = (x, y)
    surface.blit(text_obj, text_rect)

# Main game loop
running = True
while running:
    # Handle events
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Clear the screen
    screen.fill(WHITE)

    # Draw UI elements
    draw_text("Game Title", font, BLACK, screen, 10, 10)
    draw_text("Score: 100", font, BLACK, screen, 10, 50)

    # Draw buttons
    pygame.draw.rect(screen, RED, (100, 100, 200, 50))
    draw_text("Start", font, WHITE, screen, 150, 110)

    pygame.draw.rect(screen, RED, (100, 200, 200, 50))
    draw_text("Options", font, WHITE, screen, 145, 210)

    pygame.draw.rect(screen, RED, (100, 300, 200, 50))
    draw_text("Quit", font, WHITE, screen, 155, 310)

    # Update the display
    pygame.display.flip()

# Quit Pygame
pygame.quit()
sys.exit()
