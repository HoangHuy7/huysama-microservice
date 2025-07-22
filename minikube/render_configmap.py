from jinja2 import Template

# Đọc template
with open('base/configmap.yaml.j2') as f:
    template = Template(f.read())

# Giá trị biến
context = {
    'app_name': 'nginx',
    'namespace': 'dev',
    'api_url': 'https://api.myapp.com',
    'domain_name': 'localtest.me'
}

# Render ra file YAML
rendered = template.render(context)
with open('base/configmap.yaml', 'w') as f:
    f.write(rendered)

print("Đã render file configmap.yaml!")