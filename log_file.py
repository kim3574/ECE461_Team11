import os
import logging

# Constants for log levels
SILENT = "0"
INFO = "1"
DEBUG = "2"

# Read environment variables for log level and log file
LOG_LEVEL = os.getenv("LOG_LEVEL", SILENT)
LOG_FILE = os.getenv("LOG_FILE", "logfile.log")

# Configure logging based on verbosity level
log_format = '%(asctime)s - %(levelname)s - %(message)s'
if LOG_LEVEL == SILENT:
    logging.basicConfig(filename=LOG_FILE, level=logging.CRITICAL, format=log_format)
elif LOG_LEVEL == INFO:
    logging.basicConfig(filename=LOG_FILE, level=logging.INFO, format=log_format)
elif LOG_LEVEL == DEBUG:
    logging.basicConfig(filename=LOG_FILE, level=logging.DEBUG, format=log_format)

def log_message(level, message):
    """Log a message at the given level."""
    if level == SILENT:
        return
    elif level == INFO:
        logging.info(message)
    elif level == DEBUG:
        logging.debug(message)
    else:
        logging.error(f"Invalid log level: {level}")

def log_error(message):
    """Log an error message."""
    logging.error(message)
