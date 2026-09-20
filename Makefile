# Renders the résumé PDF from resume/index.html with headless Chrome.
# Override CHROME to point at a specific binary, e.g.:
#   make pdf CHROME=google-chrome

CHROME ?= $(shell command -v google-chrome google-chrome-stable chromium chromium-browser 2>/dev/null | head -n 1)
ifeq ($(CHROME),)
CHROME := /Applications/Google Chrome.app/Contents/MacOS/Google Chrome
endif

.PHONY: pdf deploy

pdf: resume/index.pdf

resume/index.pdf: resume/index.html
	"$(CHROME)" --headless=new --disable-gpu --no-sandbox --no-pdf-header-footer \
		--virtual-time-budget=10000 \
		--print-to-pdf="$(abspath $@)" "file://$(abspath $<)"

# Legacy target. The site now deploys from GitHub Actions on push to master.
deploy:
	scp -r index.html petersobot.com:/var/www/www.petersobot.com/index.html
