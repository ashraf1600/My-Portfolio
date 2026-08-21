# Industry Requirements: Docker Skills for Software Engineers (SWE)

This document outlines the core Docker competencies expected of a Software Engineer in the modern tech industry, focusing on building, running, and shipping containerized services.

## 1. Core Fundamentals
Before building and shipping, an SWE must understand the underlying concepts:
*   **Containers vs. Virtual Machines**: Understanding why containers are lightweight, how they share the host OS kernel, and when to use them.
*   **Images vs. Containers**: Knowing that an image is a read-only template and a container is a runnable, ephemeral instance of that image.
*   **Docker Architecture**: Understanding the Docker Daemon, Docker Client, and Docker Registries.

## 2. Building Containers (The `build` Phase)
Companies expect SWEs to write clean, efficient, and secure `Dockerfile`s to containerize their applications.
*   **Writing Dockerfiles**: Mastering instructions like `FROM`, `RUN`, `CMD`, `ENTRYPOINT`, `COPY`, `ADD`, `ENV`, and `WORKDIR`.
*   **Multi-stage Builds**: Using multiple `FROM` statements to compile code in one stage and copy only the built artifacts to a minimal runtime image. This significantly reduces the final image size and attack surface.
*   **Image Optimization**: 
    *   Utilizing `.dockerignore` files to prevent unnecessary files (like `.git`, `node_modules`, or local `.env` files) from bloating the build context.
    *   Minimizing the number of layers by chaining `RUN` commands where appropriate.
    *   Leveraging Docker's layer caching to speed up builds (e.g., copying package dependency files like `package.json` or `requirements.txt` before the rest of the source code).
*   **Base Image Selection**: Choosing appropriate base images (e.g., `alpine`, `slim` variants, or distroless images) for security and size constraints.

## 3. Running Containers (The `run` Phase)
Once built, an SWE must know how to execute and manage containers locally for development and testing.
*   **Container Lifecycle Management**: Starting, stopping, pausing, and removing containers (`docker run`, `docker stop`, `docker rm`, `docker system prune`).
*   **Networking**: 
    *   Mapping host ports to container ports (`-p 8080:80`).
    *   Understanding Docker networks (bridge, host, none) to allow containers to communicate with each other securely.
*   **Storage and State**:
    *   Managing persistent data using **Volumes** and **Bind Mounts** (`-v` or `--mount`). 
    *   Understanding when to use volumes (e.g., database storage) vs. bind mounts (e.g., live code reloading during local development).
*   **Environment Management**: Passing dynamic configuration through environment variables (`-e`, `--env-file`).
*   **Debugging and Troubleshooting**: Accessing running containers (`docker exec -it`), inspecting metadata (`docker inspect`), and viewing application logs (`docker logs`).

## 4. Shipping and Orchestration (The `ship` Phase)
Shipping involves taking the built image, ensuring it runs identically across environments, and deploying it.
*   **Registries and Tagging**: Tagging images appropriately (using semantic versioning and Git commit SHAs, not just `latest`) and pushing/pulling from registries like Docker Hub, AWS ECR, Google GCR, or GitHub Container Registry.
*   **Docker Compose**: Writing `docker-compose.yml` files to define and run multi-container applications (e.g., spinning up a web app alongside a Redis cache and a PostgreSQL database) for seamless local development environments.
*   **CI/CD Integration**: Understanding how Docker fits into Continuous Integration and Deployment pipelines (e.g., GitHub Actions, GitLab CI, Jenkins). This includes automating the `docker build`, `docker test`, and `docker push` lifecycle.
*   **Production Readiness**: While deeply managing Kubernetes is often a DevOps/SRE role, an SWE should understand how their container will run in production:
    *   Implementing **Healthchecks** within the Dockerfile or Compose file.
    *   Ensuring the application handles graceful shutdowns (listening for `SIGTERM` signals).

## 5. Security Best Practices
Security is a critical, non-negotiable requirement for modern containerized applications.
*   **Principle of Least Privilege**: Running containers as a non-root user (using the `USER` instruction in the Dockerfile).
*   **Secret Management**: Never hardcoding secrets, API keys, or credentials in a Dockerfile or committing them to an image.
*   **Vulnerability Scanning**: Using tools (like `docker scout`, Trivy, or Snyk) to scan images for known CVEs (Common Vulnerabilities and Exposures) before shipping.
