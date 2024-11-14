
# VPC Configuration (Si no tienes una VPC existente)
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true
}

# Subnet Configuration
resource "aws_subnet" "main" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true
}

# Security Group (Si lo necesitas para la instancia EC2)
resource "aws_security_group" "allow_ssh_http" {
  name        = "allow_ssh_http"
  description = "Allow SSH and HTTP traffic"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# EC2 Instance Configuration
resource "aws_instance" "docker_host" {
  ami                    = "ami-0f19a1cf9c1469fd6" # AMI ID proporcionada
  instance_type          = "t2.micro"
  subnet_id              = aws_subnet.main.id
  key_name               = "docker-host-key-pair" # Asegúrate de tener esta clave configurada
  associate_public_ip_address = true
  security_groups        = [aws_security_group.allow_ssh_http.name]
  
  tags = {
    Name = "docker-host"
  }

  # Con esta configuración, la instancia se detendría si se termina el ciclo
  lifecycle {
    prevent_destroy = true
  }
}

# Elástica IP (si deseas asociar una IP pública estática)
resource "aws_eip" "docker_host_eip" {
  instance = aws_instance.docker_host.id
}

# IAM Role para la instancia EC2 (si usas ECS o interactúas con otros servicios AWS)
resource "aws_iam_role" "ecs_instance_role" {
  name               = "ecs_instance_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action    = "sts:AssumeRole"
        Effect    = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_instance_policy_attach" {
  role       = aws_iam_role.ecs_instance_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerServiceforEC2Role"
}

resource "aws_autoscaling_group" "asg" {
  desired_capacity     = 1
  max_size             = 3
  min_size             = 1
  vpc_zone_identifier  = [aws_subnet.subnet_id.id]

  launch_configuration = aws_launch_configuration.my_launch_configuration.id

  tags = [
    {
      key                 = "Name"
      value               = "my-instance"
      propagate_at_launch = true
    }
  ]
}

resource "aws_launch_configuration" "my_launch_configuration" {
  name          = "my-launch-config"
  image_id      = "ami-0e252be8f4dfa2c0d"
  instance_type = "t2.micro"
  security_groups = [aws_security_group.sg.id]
}

resource "aws_lb" "ecs_alb" {
  name               = "ecs-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.sg.id]
  subnets            = aws_subnet.subnet_ids
  enable_deletion_protection = false
  enable_cross_zone_load_balancing = true
}

output "load_balancer_url" {
  value = format("Open this URL to see your app http://%s/", try(aws_lb.ecs_alb.dns_name, null))
}
